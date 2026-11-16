import { css } from 'styled-components'

/*
 * 큰 글씨: 메뉴와 버튼 글자를 키움
 * 메뉴 화면은 피그마 시안 기준(한 줄 3개, 페이지당 9개), 나머지 화면은 약 1.25배
 * 페이지당 9개로 나누는 로직은 Kiosk.jsx의 paginate()
 */
export const largeTextStyles = css`
  &&&[data-large='true'] {
    /* 진행 단계 */
    .steps {
      --step-label-height: calc(52 * var(--u));
      flex-basis: calc(150 * var(--u));
      height: calc(150 * var(--u));
      margin-inline: calc(60 * var(--u));
      font-size: calc(46 * var(--u));
    }

    /* 카테고리·하위 카테고리: 글자를 키우고, 넘치는 항목은 가로로 넘겨 보기 */
    .categories, .subcategories {
      overflow-x: auto;
      scrollbar-width: none;
    }
    .categories::-webkit-scrollbar, .subcategories::-webkit-scrollbar { display: none; }
    .categories { flex-basis: calc(90 * var(--u)); height: calc(90 * var(--u)); gap: calc(50 * var(--u)); padding-inline: calc(60 * var(--u)) 0; }
    .categories button { flex: none; font-size: calc(44 * var(--u)); }
    .subcategories { height: calc(90 * var(--u)); gap: calc(36 * var(--u)); padding-inline: calc(60 * var(--u)) 0; }
    .subcategories button { flex: none; padding: calc(6 * var(--u)) calc(18 * var(--u)); border-radius: calc(20 * var(--u)); font-size: calc(40 * var(--u)); }
    .row-more {
      position: sticky; right: 0; flex: none;
      align-self: stretch;
      width: calc(80 * var(--u)); margin-left: auto;
      background: inherit;
      font-size: calc(48 * var(--u)); font-weight: 400;
    }
    .categories .row-more, .subcategories .row-more { background: white; }
    &[data-contrast='true'] .categories .row-more { background: var(--paper); }
    &[data-contrast='true'] .subcategories .row-more { background: var(--surface); }

    /* 메뉴 목록: 한 줄 3개, 카드·이미지·글자 확대 */
    .product-grid {
      top: calc(130 * var(--u));
      left: calc(85 * var(--u));
      grid-template-columns: repeat(3, calc(290 * var(--u)));
      gap: calc(20 * var(--u));
    }
    /* 이름·가격은 이미지 아래 영역에서 붙여서 세로 가운데 정렬: 이름이 한 줄이든 두 줄이든 이름-가격 간격이 같음 */
    .product {
      display: flex; flex-direction: column; justify-content: center; gap: calc(4 * var(--u));
      height: calc(290 * var(--u));
      padding: calc(150 * var(--u)) calc(6 * var(--u)) calc(8 * var(--u));
      font-size: calc(34 * var(--u));
    }
    /* 사진 확대: 가운데 맞춤 이동(translateX -50%)까지 같이 확대되면 왼쪽으로 밀리므로 translate를 분리 */
    .product-image { top: calc(18 * var(--u)); transform: none; translate: -50% 0; scale: 1.35; transform-origin: top center; }
    .product strong, .product-price { position: static; line-height: calc(40 * var(--u)); }
    .product strong[data-compact='true'] { transform: scaleX(.9); }
    .badge { padding: 0 calc(8 * var(--u)); font-size: calc(30 * var(--u)); }
    /* 단계·카테고리가 커져 메뉴 영역이 짧아지므로 페이지 이동은 메뉴 영역 아래쪽에 붙임 */
    .pagination { inset-block: auto calc(16 * var(--u)); font-size: calc(36 * var(--u)); gap: calc(40 * var(--u)); }

    /* 담은 메뉴 */
    .cart-preview { font-size: calc(36 * var(--u)); }
    .cart-row small { font-size: calc(26 * var(--u)); }
    .cart-scroll .cart-item-name { top: calc(12 * var(--u)); max-width: calc(440 * var(--u)); }
    .cart-scroll .cart-price { top: calc(28 * var(--u)); }
    .quantity button span { font-size: calc(36 * var(--u)); }

    /* 하단 총 수량·합계·주문하기 바 */
    &[data-screen='menu'] .order-bar div { font-size: calc(30 * var(--u)); }
    &[data-screen='menu'] .order-bar strong { font-size: calc(68 * var(--u)); }
    &[data-screen='menu'] .order-bar small { font-size: calc(44 * var(--u)); }
    &[data-screen='menu'] .order-bar button { font-size: calc(52 * var(--u)); }

    /* 상품 옵션 */
    .detail-screen { font-size: calc(38 * var(--u)); }
    .detail-info h2 { font-size: calc(50 * var(--u)); }
    .detail-info p { font-size: calc(36 * var(--u)); }
    .detail-totals .amount strong { font-size: calc(72 * var(--u)); }
    .detail-fields legend, .personal-fields legend { font-size: calc(50 * var(--u)); }
    .detail-fields fieldset button { font-size: calc(50 * var(--u)); }
    .detail-fields .personal-options { font-size: calc(48 * var(--u)); }
    .personal-heading { font-size: calc(48 * var(--u)); }

    /* 화면 아래 버튼(이전·메뉴담기·결제하기 등) */
    .detail-actions button { font-size: calc(52 * var(--u)); }

    /* 디저트 추천·주문 확인 */
    .more-menu { font-size: calc(50 * var(--u)); }
    .review-title { font-size: calc(56 * var(--u)); }
    .cart-heading { font-size: calc(46 * var(--u)); }
    .review-cart .cart-row { font-size: calc(48 * var(--u)); }
    .review-cart .cart-item-name small { font-size: calc(30 * var(--u)); }
    .snack-suggestions h2 { font-size: calc(48 * var(--u)); }
    .snack-suggestions button { font-size: calc(30 * var(--u)); }
    .review-total { font-size: calc(48 * var(--u)); }
    .review-total div strong { font-size: calc(68 * var(--u)); }

    /* 결제 */
    .payment-total { font-size: calc(46 * var(--u)); }
    .payment-methods h1, .card-title h1 { font-size: calc(60 * var(--u)); }
    .payment-grid button { font-size: calc(50 * var(--u)); }
    .payment-grid button small { font-size: calc(34 * var(--u)); }
    .payment-grid button:nth-child(3) { font-size: calc(42 * var(--u)); }
    .payment-grid button:nth-child(5) { font-size: calc(42 * var(--u)); }
    .card-title p { font-size: calc(46 * var(--u)); line-height: calc(62 * var(--u)); }
    .card-instructions > p:not(.order-warning) { font-size: calc(56 * var(--u)); white-space: normal; padding-inline: calc(40 * var(--u)); }
    .payment-notice p { font-size: calc(42 * var(--u)); }

    /* 주문 완료 */
    .complete-message { font-size: calc(50 * var(--u)); }
    .complete-message h1 { font-size: calc(64 * var(--u)); }
  }
`
