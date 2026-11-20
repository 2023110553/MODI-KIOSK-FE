import { css } from 'styled-components'

export const guidanceStyles = css`
  .touch-guidance-layer {
    position: absolute;
    inset: 0;
    z-index: 20;
    overflow: hidden;
    pointer-events: none;
  }

  &&&[data-guidance='true'] .touch-guidance-bubble {
    --guide-tail: calc(22 * var(--u));
    position: absolute;
    width: max-content;
    max-width: calc(100% - 36 * var(--u));
    padding: calc(18 * var(--u)) calc(34 * var(--u));
    border: var(--guide-outline-width, 0) solid var(--guide-outline, transparent);
    border-radius: calc(50 * var(--u));
    background: var(--guide-surface, #1747d6);
    color: var(--guide-content, #fff);
    font-size: calc(42 * var(--u));
    font-weight: var(--guide-font-weight, 600);
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
    box-shadow: var(--guide-shadow, 0 calc(6 * var(--u)) calc(18 * var(--u)) #0000004d);
  }

  &&& .touch-guidance-bubble::after {
    content: '';
    position: absolute;
    left: var(--guide-tail-x, 50%);
    transform: translateX(-50%);
    border: var(--guide-tail) solid transparent;
  }

  &&& .touch-guidance-bubble[data-placement='above']::after {
    top: 100%;
    border-bottom: 0;
    border-top-color: var(--guide-surface, #1747d6);
  }

  &&& .touch-guidance-bubble[data-placement='below']::after {
    bottom: 100%;
    border-top: 0;
    border-bottom-color: var(--guide-surface, #1747d6);
  }

  &&& .touch-guidance-bubble[data-placement='left']::after,
  &&& .touch-guidance-bubble[data-placement='right']::after {
    top: var(--guide-tail-y, 50%);
    transform: translateY(-50%);
  }

  &&& .touch-guidance-bubble[data-placement='left']::after {
    left: 100%;
    border-right: 0;
    border-left-color: var(--guide-surface, #1747d6);
  }

  &&& .touch-guidance-bubble[data-placement='right']::after {
    right: 100%;
    left: auto;
    border-left: 0;
    border-right-color: var(--guide-surface, #1747d6);
  }

  &&& .touch-guidance-bubble[data-placement='inside']::after { display: none; }
`
