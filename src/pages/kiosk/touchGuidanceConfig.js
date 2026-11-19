export const kioskTouchGuidanceConfig = Object.freeze({
  designWidth: 1080,
  targetSelector: "[data-guide]:not([data-guide='false'])",
  labelAttribute: 'data-guide-label',
  placementAttribute: 'data-guide-place',
  defaultLabel: '여기를 눌러 주세요',
  obstacleSelector: 'button:not(:disabled), [role="button"]:not([aria-disabled="true"])',
  edgeMargin: 18,
  gap: 10,
})
