import { css } from 'styled-components'

/*
 * 색상 고대비: 피그마 시안 구성을 흑백으로 맞춤
 * 화면은 검정 배경 + 흰 글자, 시안의 노랑 자리 = 흰색(검정 글자), 올리브 자리 = 회색(흰 글자)
 */
export const contrastStyles = css`
  &&&[data-contrast='true'] {
    --ink: #fff;
    --paper: #121212;
    --surface: #373737;
    --line: #fff;
    --accent: #fff;
    --contrast-action: #e8e8e8; /* 주요 버튼: 순백보다 눈부심이 덜한 밝은 회색 (검정 글자 대비 약 17:1) */
    --contrast-action-ink: #000;
    --contrast-panel: #5c5c5c;
    --contrast-border: #8a8a8a;
    --contrast-stroke: max(2px, calc(3 * var(--u)));
    --contrast-disabled-ink: #a0a0a0;
    --contrast-disabled-bg: #262626;

    background: var(--paper);
    color: var(--ink);

    /* 기본 디자인의 검정·회색 글자를 모두 흰 글자로: 아래에서 색을 따로 지정한 요소만 예외 */
    * { color: inherit; }

    /* 개발용 접근성 프로필 테스트 패널(?preview): --ink가 흰색이 되어 흰 박스로 보이지 않도록 */
    .preview { background: #000; color: #fff; box-shadow: 0 0 0 1px #fff; }

    /* 공통 배경 */
    .product-detail, .detail-summary, .personal-choices, .cart-heading,
    .snack-suggestions, .payment-methods, .card-instructions, .more-menu {
      background: var(--paper);
    }
    .catalog { background: var(--surface); }

    /* 상단 툴바: 흰 테두리 버튼, 주황 아이콘은 흰색으로 */
    .toolbar { background: var(--paper); color: var(--ink); font-weight: 600; }
    .toolbar button, .toolbar-end span {
      border-color: var(--ink);
      box-shadow: inset 0 0 0 1px var(--ink);
      background: var(--paper);
    }
    .toolbar button img, .toolbar-end img, .order-warning img, .payment-dots {
      filter: brightness(0) invert(1);
    }

    /* 시작 화면: 매장은 검정 바탕+흰 테두리, 포장은 흰 바탕 */
    .start-actions button {
      background: var(--paper); color: var(--ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--ink);
    }
    .start-actions button + button img { filter: brightness(0); }

    /* 주요 버튼(다음 단계로 가는 버튼): 흰 바탕 검정 글자 */
    .start-actions button + button, .order-bar button,
    .detail-actions button + button {
      background: var(--contrast-action);
      color: var(--contrast-action-ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-action);
    }

    /* 보조 버튼(이전·취소 등): 검정 바탕 흰 글자 + 회색 테두리 (배경과 구분되도록) */
    .detail-actions button {
      background: #000;
      color: var(--ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-border);
    }

    /* 메뉴 화면 하단 가격·주문하기 바: 원래 디자인처럼 테두리만 있는 카드 (흰 채움 없이 어두운 배경 + 얇은 연회색 선) */
    .order-bar {
      background: var(--paper); color: var(--ink);
      border-color: #e8e8e8; /* 원래 디자인의 얇은 연회색 선 (두께는 기본 스타일 그대로) */
    }
    .order-bar div + div::before { border-color: var(--ink); }
    .order-bar button {
      background: var(--contrast-action); color: #000;
      box-shadow: none;
    }
    .order-bar button:disabled {
      background: transparent;
      color: var(--contrast-disabled-ink);
      outline: 2px dashed var(--contrast-disabled-ink);
    }

    /* 주문 확인: 장바구니 제목 줄 = 흰색(시안 노랑 자리), 합계 줄 = 회색(시안 올리브 자리) */
    .cart-heading { background: var(--contrast-action); color: var(--contrast-action-ink); }
    .review-total { background: var(--contrast-panel); color: var(--ink); }
    .review-total div + div { border-color: var(--ink); }

    /* 진행 단계 */
    .step-dot { background: var(--paper); border-color: var(--ink); border-width: max(2px, calc(2 * var(--u))); }
    .steps li[data-complete='true'] .step-dot { background: var(--ink); }
    /* 완료 단계 아이콘(어두운 원 + 체크)을 반전해 흰 원 + 검정 체크로 */
    .step-dot img { filter: invert(1); }
    .steps li::before { border-top-color: var(--ink); border-top-width: 2px; }
    .steps li[aria-current='step'] { font-weight: 700; }

    /* 카테고리: 선택은 밑줄, 하위 카테고리 선택은 흰 칩 */
    .categories button[aria-pressed='true'] {
      background: transparent; color: var(--ink);
      font-weight: 700;
      text-decoration: underline; text-underline-offset: .2em;
    }
    .subcategories button { background: transparent; }
    .subcategories button[aria-pressed='true'] {
      background: var(--contrast-action); color: var(--contrast-action-ink);
      font-weight: 700;
    }

    /* 메뉴 카드 */
    .product { background: var(--paper); }
    .product::after { box-shadow: inset 0 0 0 max(1px, var(--u)) #b5b5b5; }
    .product strong, .product-price, .categories button,
    .subcategories button, .detail-info h2, .cart-heading,
    .personal-heading button, .personal-choices button,
    .bubble-choice, .quantity button span, .dessert-quantity button span {
      font-weight: 600;
    }
    .badge, .badge[data-badge='Best'] {
      z-index: 1; background: var(--contrast-action); color: var(--contrast-action-ink); font-weight: 650;
    }

    /* 상품 옵션: 선택 안 함 = 검정+회색 테두리, 선택 = 흰 바탕 */
    .detail-fields fieldset button, .personal-heading button, .personal-choices button {
      background: var(--paper); color: var(--ink);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-border);
    }
    .detail-fields fieldset button[aria-pressed='true'],
    .personal-choices button[aria-pressed='true'] {
      background: var(--ink); color: var(--paper);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--ink);
      font-weight: 700;
      text-decoration: underline; text-underline-offset: .2em;
    }
    .detail-fields .temperature button[data-cold='true'][aria-pressed='true'] {
      background: var(--ink); color: var(--paper);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--ink);
    }
    .detail-fields fieldset button, .detail-actions button,
    .payment-grid button, .more-menu { font-weight: 600; }
    .detail-fields .personal-options { background: var(--contrast-panel); color: var(--ink); font-weight: 600; }
    .personal-summary .amount strong,
    .personal-summary .amount > span:last-child strong { color: var(--ink); }
    .bubble-choice img { visibility: hidden; }
    .bubble-choice input {
      opacity: 1;
      height: calc(28 * var(--u));
      align-self: center;
      accent-color: var(--contrast-action);
      cursor: pointer;
    }

    /* 테두리 */
    /* 장바구니 스크롤 화살표: 보조 버튼과 같은 회색 테두리 */
    .cart-scroll-buttons button { background: var(--paper); box-shadow: inset 0 0 0 var(--contrast-stroke) var(--contrast-border); }
    .payment-grid button, .payment-notice, .more-menu {
      background: var(--paper);
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--ink);
    }
    .dessert-grid article::after, .snack-suggestions button {
      border-color: var(--contrast-border);
      border-width: var(--contrast-stroke);
    }
    .snack-suggestions button { background: var(--paper); }
    .payment-overlay { background: rgb(0 0 0 / 70%); }
    /* 네이버페이 로고: 검정 'Pay' 글자를 흰색으로 (초록 N 색은 유지) */
    .naver-logo { filter: invert(1) hue-rotate(180deg); }
    /* 하트 바코드 아이콘: 검정 막대를 흰색으로 (노란 체크 색은 유지) */
    .payment-grid button img[src*='payment-barcode'] { filter: invert(1) hue-rotate(180deg); }

    /* 수량·삭제 버튼: 아이콘 대신 흰 동그라미 안에 기호 */
    .quantity button, .dessert-quantity button, .remove-item {
      background: var(--paper); color: var(--ink);
      box-shadow: inset 0 0 0 2px var(--ink);
      border-radius: 50%;
    }
    .quantity button img, .dessert-quantity button img { visibility: hidden; }
    .remove-item { position: relative; }
    .remove-item img { position: absolute; inset: 0; visibility: hidden; }
    .remove-item::after { content: '×'; font-weight: 700; line-height: 1; }
    .snack-add { background: var(--ink); color: var(--paper); border-radius: 50%; font-weight: 650; }
    .snack-add img { visibility: hidden; }

    /* 비활성: 색 + 점선 테두리 */
    button:disabled, .detail-actions button:disabled {
      opacity: 1;
      color: var(--contrast-disabled-ink);
      background: var(--contrast-disabled-bg);
      box-shadow: none;
      outline: 2px dashed var(--contrast-disabled-ink);
      outline-offset: -2px;
    }
    /* 결제 수단(제휴카드 등)은 비활성이어도 신용카드 버튼과 같은 흰 테두리 */
    .payment-grid button:disabled {
      background: var(--paper);
      color: var(--ink);
      outline: none;
      box-shadow: inset 0 0 0 var(--contrast-stroke) var(--ink);
    }
    /* 수량 빼기(−) 버튼: 수량 1일 때도 기본 화면처럼 동그라미 모양 유지 (점선 대신 회색) */
    .quantity button:disabled, .dessert-quantity button:disabled {
      background: var(--paper);
      color: var(--contrast-border);
      outline: none;
      box-shadow: inset 0 0 0 2px var(--contrast-border);
    }
    .product:disabled::after { background: transparent; box-shadow: none; }
    .pagination button:disabled {
      background: transparent;
      outline: none;
      text-decoration: line-through;
    }

    /* 키보드 포커스 */
    :focus-visible, .bubble-choice:has(input:focus-visible) {
      outline: 3px solid var(--contrast-action);
      outline-offset: 3px;
    }
    .order-bar button:focus-visible {
      outline: 4px solid #000;
      outline-offset: calc(-4px - var(--contrast-stroke));
    }
    .detail-actions button + button:focus-visible {
      outline: 4px solid var(--contrast-action-ink);
      outline-offset: calc(-4px - var(--contrast-stroke));
    }
  }
`
