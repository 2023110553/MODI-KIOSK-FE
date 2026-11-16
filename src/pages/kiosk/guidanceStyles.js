import { css } from 'styled-components'

export const guidanceStyles = css`
  &&&[data-guidance='true'] {
    --guide-color: #1747d6;
    --guide-tail: calc(18 * var(--u));
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
      padding: calc(14 * var(--u)) calc(26 * var(--u));
      border-radius: calc(40 * var(--u));
      background: var(--guide-color);
      color: #fff;
      font-size: calc(34 * var(--u));
      font-weight: 750;
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
    .order-bar [data-guide='true']::before {
      left: auto;
      right: calc(12 * var(--u));
      transform: none;
    }

    /* 위쪽 여백이 좁은 요소는 말풍선을 요소 안쪽 위에 표시 */
    [data-guide='true'][data-guide-place='inside'] {
      --guide-top: calc(16 * var(--u));
    }
    .card-instructions[data-guide='true'] { --guide-top: calc(440 * var(--u)); }
    [data-guide='true'][data-guide-place='inside']::before {
      bottom: auto;
      top: var(--guide-top);
    }
    [data-guide='true'][data-guide-place='inside']::after {
      bottom: auto;
      top: calc(var(--guide-top) + 69 * var(--u));
    }
  }

  &&&[data-guidance='true'][data-contrast='true'] {
    --guide-color: #0033b8;
  }
`
