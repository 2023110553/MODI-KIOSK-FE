import { css } from 'styled-components'

export const lowerControlsStyles = css`
  &&&&[data-reach='true']:is([data-screen='menu'], [data-screen='payment']) {
    --lower-columns: 3;
    --lower-card-width: 180;
    --lower-card-height: 236;
    --lower-card-font: 26;
    --lower-toolbar-height: calc(82 * var(--u));

    .lower-controls-guide {
      flex: 0 0 calc(795 * var(--u) - var(--lower-toolbar-height));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: calc(34 * var(--u));
      background: #000;
      color: #fff;
      text-align: center;
      font-size: calc(64 * var(--u));
      font-weight: 500;
      line-height: 1.15;
    }

    .lower-controls-guide img { width: calc(337 * var(--u)); height: auto; }
    > .toolbar {
      position: sticky;
      top: 0;
      z-index: 1;
      flex: 0 0 var(--lower-toolbar-height);
      height: var(--lower-toolbar-height);
      background: inherit;
    }
    .steps {
      flex: 0 0 calc(169 * var(--u));
      grid-template-columns: repeat(4, minmax(0, 1fr));
      height: auto;
      margin-inline: calc(64 * var(--u));
      padding-top: calc(42 * var(--u));
    }
    .categories, .subcategories {
      flex: 0 0 calc(90 * var(--u));
      height: auto;
      overflow-x: auto;
      scrollbar-width: none;
      padding-inline: calc(63 * var(--u)) 0;
    }
    .categories::-webkit-scrollbar, .subcategories::-webkit-scrollbar { display: none; }
    .categories button, .subcategories button { flex: none; }
    .row-more {
      position: sticky;
      right: 0;
      width: calc(72 * var(--u));
      margin-left: auto;
      background: #fff;
    }

    .catalog {
      display: grid;
      grid-template: calc(124 * var(--u)) 1fr / minmax(0, 1fr) calc(355 * var(--u));
      column-gap: calc(28 * var(--u));
      align-content: start;
      padding: 0 calc(63 * var(--u));
      background: #fff;
    }
    .subcategories {
      grid-column: 1 / -1;
      align-self: start;
      min-height: calc(64 * var(--u));
      padding-inline: 0;
    }
    &:has(.cart-row) .catalog { grid-template-rows: calc(84 * var(--u)) 1fr; }
    .product-grid {
      position: static;
      grid-template-columns: repeat(var(--lower-columns), calc(var(--lower-card-width) * var(--u)));
      grid-auto-rows: calc(var(--lower-card-height) * var(--u));
      align-content: start;
      gap: calc(16 * var(--u));
    }
    .product {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: auto;
      min-width: 0;
      gap: calc(3 * var(--u));
      padding: calc(8 * var(--u)) calc(6 * var(--u));
      font-size: calc(var(--lower-card-font) * var(--u));
    }
    .product strong, .product-price { position: static; line-height: 1.15; }
    .product strong, .product strong[data-lines='fixed'] {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      white-space: normal;
    }
    .product-image {
      position: relative;
      inset: auto;
      flex: none;
      transform: none;
      translate: none;
      scale: none;
    }

    .pagination {
      position: static;
      align-self: start;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      justify-content: stretch;
      justify-items: stretch;
      grid-template-rows: calc(239 * var(--u)) repeat(2, calc(67 * var(--u))) calc(48 * var(--u));
      align-content: start;
      align-items: center;
      row-gap: calc(12 * var(--u));
      height: calc(504 * var(--u));
      padding: calc(26 * var(--u)) 0 0;
      background: #e9e9e9;
      color: #20352b;
      font-size: calc(45 * var(--u));
      text-align: center;
    }
    .lower-controls-preview {
      justify-self: center;
      width: calc(276 * var(--u));
      height: calc(239 * var(--u));
      align-self: stretch;
      display: grid;
      justify-items: center;
      align-content: center;
      gap: calc(8 * var(--u));
      min-height: calc(211 * var(--u));
      background: #fff;
      font-size: calc(34 * var(--u));
    }
    .lower-controls-preview img { width: calc(125 * var(--u)); aspect-ratio: 1; object-fit: contain; }
    .pagination > span { grid-row: 4; margin: 0; font-size: calc(40 * var(--u)); line-height: 1; }
    .pagination button {
      justify-self: center;
      width: calc(262 * var(--u));
      height: calc(67 * var(--u));
      padding: 0;
      border-radius: calc(15 * var(--u));
      background: #fff;
    }
    .pagination button:disabled { opacity: .48; }

    .cart-preview { flex-basis: calc(84 * var(--u)); }
    .cart-preview:has(.cart-scroll:empty) { flex-basis: 0; }
    .cart-scroll-buttons { top: 0; gap: calc(3 * var(--u)); }
    .cart-scroll-buttons button { height: calc(38 * var(--u)); }
    .cart-scroll .cart-row { height: calc(80 * var(--u)); }
    .order-bar { margin-bottom: calc(32 * var(--u)); }

    .product-detail {
      position: fixed;
      inset: calc((100dvh - 1920 * var(--u)) / 2 + 915 * var(--u)) 0 auto;
      width: calc(792 * var(--u));
      max-height: calc(860 * var(--u));
      overflow: auto;
      padding: calc(35 * var(--u)) calc(52 * var(--u));
    }
    .product-detail::backdrop {
      background: linear-gradient(transparent calc((100dvh - 1920 * var(--u)) / 2 + 795 * var(--u)), #0007 0);
    }
    .product-detail .detail-screen { display: flex; flex-direction: column; gap: calc(22 * var(--u)); height: auto; }
    .product-detail .toolbar { display: none; }
    .product-detail .detail-summary {
      position: static;
      display: grid;
      grid-template-columns: calc(186 * var(--u)) 1fr;
      align-items: start;
      gap: calc(44 * var(--u));
      height: auto;
    }
    .product-detail .detail-image {
      position: static;
      width: calc(186 * var(--u));
      height: calc(186 * var(--u));
      mask-image: none !important;
    }
    .product-detail .detail-image img { position: static; width: 100%; height: 100%; }
    .product-detail .detail-info h2, .product-detail .detail-info p { position: static; font-size: calc(32 * var(--u)); }
    .product-detail .detail-info h2 { font-size: calc(40 * var(--u)); font-weight: 600; }
    .product-detail .detail-totals { position: static; flex-wrap: wrap; gap: calc(8 * var(--u)); }
    .product-detail .detail-totals .quantity,
    .product-detail .detail-totals .amount { position: static; }
    .product-detail .detail-totals .amount strong { margin-inline-start: 0; }
    .product-detail .detail-totals .amount strong { font-size: calc(38 * var(--u)); }
    .product-detail .detail-fields, .product-detail .personal-fields { position: static; }
    .product-detail .personal-summary {
      grid-template-columns: calc(120 * var(--u)) 1fr;
      align-items: center;
      gap: calc(12 * var(--u)) calc(24 * var(--u));
    }
    .product-detail .personal-summary .detail-image {
      width: calc(120 * var(--u));
      height: calc(120 * var(--u));
    }
    .product-detail .personal-summary .detail-info { display: contents; }
    .product-detail .personal-summary .amount {
      position: static;
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1fr auto 1fr auto 1fr;
      align-items: center;
      height: auto;
      font-size: calc(27 * var(--u));
    }
    .product-detail .personal-summary .amount > :is(span, b) {
      position: static;
      width: auto;
      line-height: 1.2;
      text-align: center;
    }
    .product-detail .personal-summary .amount > span { grid-template-rows: auto auto; }
    .product-detail .personal-fields fieldset { height: auto; min-width: 0; }
    .product-detail .personal-fields legend { height: auto; font-size: calc(32 * var(--u)); }
    .product-detail .personal-choices {
      height: calc(62 * var(--u));
      justify-content: flex-start;
      padding-inline: 0;
    }
    .product-detail .personal-choices button { flex: 1; min-width: 0; height: calc(52 * var(--u)); }
    .product-detail .detail-fields fieldset { height: auto; margin-bottom: calc(24 * var(--u)); }
    .product-detail .detail-fields legend { height: auto; margin-bottom: calc(14 * var(--u)); font-size: calc(40 * var(--u)); }
    .product-detail .detail-fields fieldset button {
      width: calc(50% - 10 * var(--u));
      margin-right: calc(16 * var(--u));
      font-size: calc(38 * var(--u));
    }
    .product-detail .detail-fields fieldset button:nth-of-type(2n), .product-detail .detail-fields fieldset button:last-child { margin-right: 0; }
    .product-detail .detail-fields fieldset:has(button:only-of-type):not(.temperature) { display: none; }
    .product-detail .detail-fields .personal-options { position: static; width: 100%; height: calc(64 * var(--u)); }
    .product-detail .detail-screen > .detail-actions { position: static; min-height: calc(80 * var(--u)); }
    .product-detail .detail-actions button { font-size: calc(36 * var(--u)); }

    &[data-large='true'] {
      --lower-columns: 2;
      --lower-card-width: 276;
      --lower-card-height: 240;
      --lower-card-font: 34;

      .lower-controls-guide {
        justify-content: flex-start;
        padding-top: calc(251 * var(--u) - var(--lower-toolbar-height));
        gap: calc(45 * var(--u));
        font-size: calc(80 * var(--u));
      }
      .categories { gap: calc(48 * var(--u)); }
      .product { background: #fff; color: #20352b; }
    }

    &:not([data-large='true']) {
      --lower-card-width: 212;
      --lower-card-height: 239;
      --lower-card-font: 24;

      .lower-controls-guide {
        flex-basis: calc(984 * var(--u) - var(--lower-toolbar-height));
        justify-content: flex-start;
        padding-top: calc(396 * var(--u) - var(--lower-toolbar-height));
        gap: calc(46 * var(--u));
        font-size: calc(40 * var(--u));
      }
      .categories {
        flex-basis: calc(120 * var(--u));
        justify-content: space-between;
        gap: calc(18 * var(--u));
        padding-inline: calc(48 * var(--u));
      }
      .categories .row-more { display: none; }
      .catalog {
        grid-template: calc(123 * var(--u)) 1fr / calc(653 * var(--u)) calc(355 * var(--u));
        column-gap: calc(18 * var(--u));
        padding-inline: calc(37 * var(--u)) calc(17 * var(--u));
      }
      .subcategories { justify-content: center; min-height: calc(103 * var(--u)); }
      .product-grid { gap: calc(12 * var(--u)) calc(8 * var(--u)); }
      .product { background: #fff; color: #20352b; }
      .order-bar { margin: 0; border-radius: 0; }
      &:has(.cart-row) .catalog { grid-template-rows: calc(55 * var(--u)) 1fr; }
    }
  }

  &&&&[data-reach='true'][data-screen='review'] {
    .review-screen .review-actions { inset-block: auto 0; }
    .review-total { inset-block: auto calc(175 * var(--u)); }
    .snack-suggestions { inset-block: auto calc(335 * var(--u)); }
    .review-cart { bottom: calc(715 * var(--u)); height: auto; }
  }

  &&&&[data-reach='true'][data-screen='payment'] {
    .payment-methods {
      flex: 1 0 auto;
      padding: calc(30 * var(--u)) calc(43 * var(--u)) calc(28 * var(--u));
    }
    .payment-methods h1 { position: static; margin-bottom: calc(32 * var(--u)); font-size: calc(50 * var(--u)); }
    .payment-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: calc(17 * var(--u));
    }
    .payment-grid button:nth-child(n) {
      position: static;
      width: auto;
      height: calc(219 * var(--u));
      padding: calc(8 * var(--u));
      font-size: calc(36 * var(--u));
    }
    .payment-grid button:nth-child(1) { grid-area: 1 / 1; }
    .payment-grid button:nth-child(4) { grid-area: 1 / 2; flex-direction: column-reverse; }
    .payment-grid button:nth-child(3) { grid-area: 1 / 3; }
    .payment-grid button:nth-child(5) { grid-area: 2 / 1; }
    .payment-grid button:nth-child(2) { grid-area: 2 / 2; }
    .payment-grid button:nth-child(6) { grid-area: 2 / 3; }
    .payment-grid .card-logo, .payment-grid .easy-payment > span { position: static; }
    .payment-grid .easy-payment img { width: calc(82 * var(--u)); height: auto; }
    .payment-grid .card-logo { width: calc(67 * var(--u)); height: calc(58 * var(--u)); }
    .reach-payment-footer {
      flex: 0 0 calc(160 * var(--u));
      display: grid;
      grid-template-columns: 1fr calc(320 * var(--u));
      align-items: center;
      text-align: center;
      font-size: calc(38 * var(--u));
    }
    .reach-payment-footer strong { margin-inline-start: calc(42 * var(--u)); }
    .reach-payment-footer button { align-self: stretch; background: #2d2d2d; color: #fff; font-weight: 600; }
    .reach-payment-footer button:disabled { opacity: .6; }
    .payment-grid button[aria-pressed='true'] { outline: calc(4 * var(--u)) solid currentColor; outline-offset: calc(-4 * var(--u)); }
  }
`
