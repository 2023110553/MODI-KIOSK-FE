import { css } from 'styled-components'

export const guidanceStyles = css`
  &&&[data-guidance='true'] {
    --guide-color: #1747d6;
    --guide-tail: calc(22 * var(--u));
    --guide-font: calc(42 * var(--u));
    --guide-pad-y: calc(18 * var(--u));
    --guide-pad-x: calc(34 * var(--u));
    --guide-gap: calc(6 * var(--u));

    [data-guide='true'] {
      z-index: 2;
      overflow: visible;
    }
    [data-guide='true']:not(.payment-grid button, .card-instructions) {
      position: relative;
    }

    /* 말풍선 + 꼬리: 강조 요소 바로 위에 표시 */
    [data-guide='true']::before, [data-guide='true']::after {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
    [data-guide='true']::before {
      content: '여기를 눌러 주세요';
      width: max-content;
      justify-self: start;
      bottom: calc(100% + var(--guide-tail) + var(--guide-gap));
      padding: var(--guide-pad-y) var(--guide-pad-x);
      border-radius: calc(50 * var(--u));
      background: var(--guide-color);
      color: #fff;
      font-size: var(--guide-font);
      font-weight: 600;
      line-height: 1.2;
      white-space: nowrap;
      box-shadow: 0 calc(6 * var(--u)) calc(18 * var(--u)) #0000004d;
    }
    [data-guide='true']::after {
      content: '';
      bottom: calc(100% + var(--guide-gap));
      border: var(--guide-tail) solid transparent;
      border-bottom: 0;
      border-top-color: var(--guide-color);
      background: none;
    }
    [data-guide='true'][data-guide-label]::before {
      content: attr(data-guide-label);
    }

    /* 화면 오른쪽 끝 버튼은 말풍선을 오른쪽에 맞춤 */
    .order-bar [data-guide='true']::before,
    .start-actions [data-guide='true']:last-child:not(:first-child)::before,
    .detail-actions [data-guide='true']:last-child:not(:first-child)::before {
      left: auto;
      right: calc(12 * var(--u));
      transform: none;
    }
    /* 주문하기 버튼: 오른쪽 장바구니 스크롤 화살표(∧∨)를 가리지 않도록 왼쪽으로 더 이동 */
    .order-bar [data-guide='true']::before {
      right: calc(80 * var(--u));
    }
    /* 화면 왼쪽 끝 버튼(괜찮아요·이전·매장 등)은 말풍선을 왼쪽에 맞춤 */
    .detail-actions [data-guide='true']:first-child:not(:only-child)::before,
    .start-actions [data-guide='true']:first-child::before {
      left: calc(12 * var(--u));
      transform: none;
    }

    /* 디저트 화면: 아래 버튼 말풍선이 가리지 않도록 '메뉴 더보기'를 카드 바로 아래로 올림 */
    .dessert-screen .more-menu {
      top: calc(1478 * 100cqw / 1080);
      height: calc(76 * 100cqw / 1080);
    }

    /* 시작 화면: 바로 위 툴바(언어·모바일상품권)를 가리지 않도록 툴바 높이만큼 올림 */
    .start-actions [data-guide='true'] {
      --guide-gap: calc(6.85cqw + 6 * var(--u));
      --guide-tail-drop: 3cqw;
    }
    /* 말풍선은 그대로 두고 꼬리만 아래로 늘려 버튼 쪽을 가리킴 */
    .start-actions [data-guide='true']::after {
      bottom: calc(100% + var(--guide-gap) - var(--guide-tail-drop));
      border-top-width: calc(var(--guide-tail) + var(--guide-tail-drop));
    }

    /* 위쪽 여백이 좁은 요소는 말풍선을 요소 안쪽 위에 표시 */
    [data-guide='true'][data-guide-place='inside'] {
      --guide-top: calc(16 * var(--u));
    }
    .card-instructions[data-guide='true'] { --guide-top: calc(440 * var(--u)); }
    /* 주문 완료 화면: 영수증 버튼 말풍선과 붙지 않도록 '잊으신 물건이 없는지 확인하세요'를 조금 위로 */
    .complete-message .order-warning { inset-block-start: calc(1262 * var(--u)); }

    /* 상품 옵션 화면: 메뉴담기 말풍선과 겹치지 않도록 '퍼스널옵션 더보기'를 조금 위로 */
    .detail-fields .personal-options { bottom: calc(32 * var(--u)); }

    /* 결제하기 화면: 말풍선이 합계 금액을 가리지 않도록 장바구니를 줄이고 간식·합계 영역을 120만큼 올림 */
    .review-screen .review-cart { height: calc(636 * var(--u)); }
    .review-screen .snack-suggestions { top: calc(905 * var(--u)); }
    .review-screen .review-total { top: calc(1262 * var(--u)); }

    [data-guide='true'][data-guide-place='inside']::before {
      bottom: auto;
      top: var(--guide-top);
    }
    [data-guide='true'][data-guide-place='inside']::after {
      bottom: auto;
      /* 말풍선 높이(글자 1.2줄 + 위아래 여백) 바로 아래에 꼬리 */
      top: calc(var(--guide-top) + var(--guide-font) * 1.2 + 2 * var(--guide-pad-y));
    }
  }

  /* 색상 고대비가 켜졌을 때만: 고대비 3색 중 파랑(#00E1FF) 말풍선 + 검정 글자 (대비 약 12:1)
     기본 모드는 위의 진한 파랑(#1747d6) 그대로 */
  &&&[data-guidance='true'][data-contrast='true'] {
    --guide-color: #00e1ff;

    [data-guide='true']::before {
      color: #191f28;
      font-weight: 700;
      box-shadow: 0 0 0 calc(3 * var(--u)) #000, 0 calc(6 * var(--u)) calc(18 * var(--u)) #000000b3;
    }
  }
`
