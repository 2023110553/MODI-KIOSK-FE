import { css } from "styled-components";

/*
 * 키오스크와 독립적인 고대비 팔레트 매핑.
 * 다른 웹 키오스크에서는 이 값만 교체하고 contrastStyles의 의미 기반 규칙을 재사용한다.
 */
export const highContrastPalette = Object.freeze({
  canvas: "#191f28",
  content: "#ffffff",
  action: "#ffee00",
  selected: "#00e1ff",
});

export const highContrastTheme = css`
  --contrast-black: ${highContrastPalette.canvas};
  --contrast-yellow: ${highContrastPalette.action};
  --contrast-blue: ${highContrastPalette.selected};

  --ink: ${highContrastPalette.content};
  --paper: var(--contrast-black);
  --surface: var(--contrast-black);
  --line: var(--contrast-yellow);
  --accent: var(--contrast-yellow);

  --contrast-action: var(--contrast-yellow);
  --contrast-action-ink: var(--contrast-black);
  --contrast-selected: var(--contrast-blue);
  --contrast-border: var(--contrast-yellow);
  --contrast-stroke: max(2px, calc(3 * var(--u)));
  --contrast-disabled-ink: var(--contrast-yellow);
  --contrast-disabled-bg: var(--contrast-black);

  /* 레이아웃 모듈이 상태를 검사하지 않고 소비하는 의미 기반 표면 토큰 */
  --category-more-surface: var(--paper);
  --subcategory-more-surface: var(--surface);
`;
