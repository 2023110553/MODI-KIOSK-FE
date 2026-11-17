import { useEffect } from 'react'

/*
 * 터치 입력 보정: 버튼이 아닌 곳을 눌렀을 때 가까운 작은 버튼을 대신 눌러 줌
 * 단위는 화면 폭 1080 기준(1080×1920 키오스크에서 1 = 1px)이며 화면 크기에 비례
 */
const DESIGN_WIDTH = 1080
const ASSIST_RADIUS = 40 // 버튼 테두리에서 이 거리 안이면 보정
const SMALL_BUTTON = 80 // 짧은 쪽 길이가 이보다 작은 버튼만 보정 대상
const MOVE_TOLERANCE = 12 // 이보다 많이 움직이면 스크롤로 보고 보정하지 않음
const INTERACTIVE = 'button, a, input, select, textarea, label, summary, [role="button"]'

/* 점에서 사각형 테두리까지의 거리 (안쪽이면 0) */
function distanceToRect(x, y, rect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right)
  const dy = Math.max(rect.top - y, 0, y - rect.bottom)
  return Math.hypot(dx, dy)
}

/* 다른 요소에 가려지거나 스크롤 영역 밖으로 잘린 버튼은 제외 */
function isVisible(button, rect) {
  if (rect.width === 0 || rect.height === 0) return false
  const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
  return Boolean(hit) && (hit === button || button.contains(hit))
}

export function findAssistTarget(root, x, y, unit) {
  const radius = ASSIST_RADIUS * unit
  let nearest = null
  let best = radius
  for (const button of root.querySelectorAll('button:not(:disabled)')) {
    const rect = button.getBoundingClientRect()
    if (Math.min(rect.width, rect.height) >= SMALL_BUTTON * unit) continue
    const distance = distanceToRect(x, y, rect)
    if (distance <= best && isVisible(button, rect)) {
      best = distance
      nearest = button
    }
  }
  return nearest
}

export function useTouchAssist(frameRef, enabled) {
  useEffect(() => {
    const frame = frameRef.current
    if (!enabled || !frame) return undefined
    let start = null

    function onPointerDown(event) {
      start = { x: event.clientX, y: event.clientY, id: event.pointerId }
    }

    function onPointerUp(event) {
      if (!start || start.id !== event.pointerId) return
      const unit = frame.getBoundingClientRect().width / DESIGN_WIDTH
      const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y)
      start = null
      if (moved > MOVE_TOLERANCE * unit) return // 스크롤·드래그
      if (event.target.closest(INTERACTIVE)) return // 버튼을 정확히 누름 (큰 버튼 포함)
      // 상품 옵션 창이 열려 있으면 그 안의 버튼만 대상
      const root = frame.querySelector('dialog[open]') ?? frame
      const target = findAssistTarget(root, event.clientX, event.clientY, unit)
      target?.click()
    }

    frame.addEventListener('pointerdown', onPointerDown)
    frame.addEventListener('pointerup', onPointerUp)
    return () => {
      frame.removeEventListener('pointerdown', onPointerDown)
      frame.removeEventListener('pointerup', onPointerUp)
    }
  }, [frameRef, enabled])
}
