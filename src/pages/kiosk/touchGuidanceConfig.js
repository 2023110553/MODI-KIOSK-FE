export const kioskGuidanceMessages = Object.freeze({
  addToCart: '장바구니에 담으려면 눌러 주세요',
  savePersonalOptions: '옵션을 다 고르셨으면 눌러 주세요',
  submitOrder: '다 고르셨으면 눌러 주세요',
})

export const kioskTouchGuidanceConfig = Object.freeze({
  designWidth: 1080,
  targetSelector: "[data-guide]:not([data-guide='false'])",
  labelAttribute: 'data-guide-label',
  placementAttribute: 'data-guide-place',
  defaultLabel: '여기를 눌러 주세요',
  obstacleSelector: 'button:not(:disabled), [role="button"]:not([aria-disabled="true"])',
  edgeMargin: 18,
  gap: 10,
  rules: Object.freeze([
    Object.freeze({
      selector: '.product-detail [data-guide-place="below"]',
      offsetY: 30,
    }),
    Object.freeze({
      selector: '[data-large="true"][data-reach="true"] .order-bar > button[data-guide]',
      placement: 'left',
      strictPlacement: true,
      maxWidth: 360,
      wrap: true,
    }),
    Object.freeze({
      selector: '.order-bar > button[data-guide]',
      offsetX: -180,
    }),
    Object.freeze({
      selector: '.lower-cart-actions button[data-guide]',
      placement: 'left',
    }),
    Object.freeze({
      selector: '.dessert-actions [data-guide]',
      suppress: true,
    }),
  ]),
})
