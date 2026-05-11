export type ContrastMode = 'default' | 1 | 2 | 3;

export type BodyFontFamily = 'ubuntu' | 'atkinson';

export interface AccessibilityPreferences {
  contrastMode: ContrastMode;
  /** Multiplicador sobre o tamanho base (16px corpo). */
  fontScale: number;
  bodyFont: BodyFontFamily;
  boldBody: boolean;
  /** Multiplicador sobre a altura de linha base (1,5). */
  lineHeightScale: number;
  rulerEnabled: boolean;
  readingFocusEnabled: boolean;
}
