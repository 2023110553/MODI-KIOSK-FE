const DEFAULTS = Object.freeze({
  targetSelector: "[data-guide]:not([data-guide='false'])",
  labelAttribute: 'data-guide-label',
  placementAttribute: 'data-guide-place',
  defaultLabel: '여기를 눌러 주세요',
  obstacleSelector: 'button:not(:disabled), [role="button"]:not([aria-disabled="true"])',
  designWidth: 1080,
  edgeMargin: 18,
  gap: 10,
})

function isVisible(target) {
  if (!(target instanceof HTMLElement) || target.hidden || target.matches(':disabled, [aria-disabled="true"]')) return false
  const style = window.getComputedStyle(target)
  const rect = target.getBoundingClientRect()
  return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0
    && rect.width > 0 && rect.height > 0 && target.getClientRects().length > 0
}

function overlapArea(a, b) {
  const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
  const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
  return width * height
}

function candidateRect(placement, target, bubble, frame, scale, config) {
  const gap = config.gap * scale
  const tail = Math.max(8, 22 * scale)
  const center = target.left - frame.left + target.width / 2
  const left = center - bubble.width / 2
  const top = placement === 'below'
    ? target.bottom - frame.top + gap + tail
    : target.top - frame.top - gap - tail - bubble.height
  return { left, top, right: left + bubble.width, bottom: top + bubble.height }
}

function scoreCandidate(rect, frame, obstacles, margin) {
  const overflow = Math.max(0, margin - rect.left) + Math.max(0, rect.right - frame.width + margin)
    + Math.max(0, margin - rect.top) + Math.max(0, rect.bottom - frame.height + margin)
  return overflow * frame.width + obstacles.reduce((sum, obstacle) => sum + overlapArea(rect, obstacle), 0)
}

export function createTouchGuidance(options = {}) {
  const config = { ...DEFAULTS, ...options }
  return {
    attach(root) {
      if (!(root instanceof HTMLElement)) return () => {}
      const layer = document.createElement('div')
      layer.className = 'touch-guidance-layer'
      layer.setAttribute('aria-hidden', 'true')
      root.append(layer)

      const bubbles = new Map()
      let animationFrame = 0
      const resizeObserver = new ResizeObserver(schedule)

      function placeBubble(bubble, left, top, targetX, frame, margin) {
        const bubbleRect = bubble.getBoundingClientRect()
        const safeLeft = Math.min(Math.max(left, margin), frame.width - bubbleRect.width - margin)
        const safeTop = Math.min(Math.max(top, margin), frame.height - bubbleRect.height - margin)
        bubble.style.left = `${safeLeft}px`
        bubble.style.top = `${safeTop}px`
        bubble.style.setProperty('--guide-tail-x', `${Math.min(Math.max(targetX - safeLeft, 12), bubbleRect.width - 12)}px`)
      }

      function sync() {
        animationFrame = 0
        const frame = root.getBoundingClientRect()
        if (!frame.width || !frame.height) return
        const scale = frame.width / config.designWidth
        const margin = config.edgeMargin * scale
        const targets = [...root.querySelectorAll(config.targetSelector)].filter(isVisible)
        const active = new Set(targets)

        for (const [target, bubble] of bubbles) {
          if (!active.has(target)) {
            resizeObserver.unobserve(target)
            bubble.remove()
            bubbles.delete(target)
          }
        }

        const obstacleRects = [...root.querySelectorAll(config.obstacleSelector)]
          .filter(isVisible)
          .map((element) => {
            const rect = element.getBoundingClientRect()
            return { element, left: rect.left - frame.left, top: rect.top - frame.top, right: rect.right - frame.left, bottom: rect.bottom - frame.top }
          })

        for (const target of targets) {
          let bubble = bubbles.get(target)
          if (!bubble) {
            bubble = document.createElement('span')
            bubble.className = 'touch-guidance-bubble'
            layer.append(bubble)
            bubbles.set(target, bubble)
            resizeObserver.observe(target)
          }
          bubble.textContent = target.getAttribute(config.labelAttribute) || config.defaultLabel
          bubble.style.visibility = 'hidden'
          const bubbleRect = bubble.getBoundingClientRect()
          const targetRect = target.getBoundingClientRect()
          const targetX = targetRect.left - frame.left + targetRect.width / 2
          const preferred = target.getAttribute(config.placementAttribute)

          if (preferred === 'inside') {
            bubble.dataset.placement = 'inside'
            placeBubble(bubble, targetX - bubbleRect.width / 2,
              targetRect.top - frame.top + (targetRect.height - bubbleRect.height) / 2, targetX, frame, margin)
          } else {
            const obstacles = obstacleRects.filter(({ element }) => element !== target)
            const placements = preferred === 'below' ? ['below', 'above'] : ['above', 'below']
            const candidates = placements.map((placement) => ({
              placement,
              rect: candidateRect(placement, targetRect, bubbleRect, frame, scale, config),
            }))
            candidates.sort((a, b) => scoreCandidate(a.rect, frame, obstacles, margin) - scoreCandidate(b.rect, frame, obstacles, margin))
            const chosen = candidates[0]
            bubble.dataset.placement = chosen.placement
            placeBubble(bubble, chosen.rect.left, chosen.rect.top, targetX, frame, margin)
          }
          bubble.style.visibility = 'visible'
        }
      }

      function schedule() {
        if (!animationFrame) animationFrame = window.requestAnimationFrame(sync)
      }

      const mutationObserver = new MutationObserver(schedule)
      mutationObserver.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-guide', 'data-guide-label', 'data-guide-place', 'disabled', 'aria-disabled', 'hidden', 'class'],
      })
      resizeObserver.observe(root)
      root.addEventListener('scroll', schedule, true)
      window.addEventListener('resize', schedule)
      schedule()

      return () => {
        window.cancelAnimationFrame(animationFrame)
        window.removeEventListener('resize', schedule)
        root.removeEventListener('scroll', schedule, true)
        mutationObserver.disconnect()
        resizeObserver.disconnect()
        layer.remove()
      }
    },
  }
}
