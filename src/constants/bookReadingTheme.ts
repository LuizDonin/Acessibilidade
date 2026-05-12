import type { CSSProperties } from 'react';
import type { AccessibilityPreferences, ContrastMode } from '../types/accessibility';

/** Valores visuais alinhados ao livro antes das preferências. */
export const DEFAULT_ACCESSIBILITY_PREFS: AccessibilityPreferences = {
  contrastMode: 'default',
  fontScale: 1,
  bodyFont: 'ubuntu',
  boldBody: false,
  lineHeightScale: 1,
  rulerEnabled: false,
  readingFocusEnabled: false,
};

type ThemeLayer = {
  bookBgOuter: string;
  bookBgPage: string;
  bookTextBody: string;
  bookTextH3: string;
  bookTextH4: string;
  bookChapterBorder: string;
  bookChapterLabel: string;
  bookChapterTitle: string;
  paginationBg: string;
  paginationText: string;
  questionMarker: string;
  /** Foco visível (:focus-visible), linhas de tabela, headings onde aplicável */
  bookFocusRing: string;
  bookTableBorder: string;
  /** Bordas de campos, botões de formulário no miolo */
  bookInteractiveAccent: string;
  bookTableHeadBg: string;
  bookTableHeadText: string;
  bookTableCellBg: string;
  /** Cabeçalho em tabelas de preenchimento (fundo claro no padrão) */
  bookQuestionTableHeadBg: string;
  bookQuestionTableHeadText: string;
  bookTocBg: string;
  bookTocHeading: string;
  bookTocLink: string;
  bookTocBorder: string;
  bookTocCtaBg: string;
  bookTocCtaText: string;
};

const CONTRAST_THEMES: Record<Exclude<ContrastMode, 'default'>, ThemeLayer> = {
  // Modo 1 — paleta solicitada
  1: {
    bookBgOuter: '#272937',
    bookBgPage: '#272937',
    bookTextBody: '#ffffff',
    bookTextH3: '#9fe2ef',
    bookTextH4: '#9fe2ef',
    bookChapterBorder: '#9fe2ef',
    bookChapterLabel: '#9fe2ef',
    bookChapterTitle: '#9fe2ef',
    paginationBg: '#2a3b4f',
    paginationText: '#9fe2ef',
    questionMarker: '#9fe2ef',
    bookFocusRing: '#9fe2ef',
    bookTableBorder: '#9fe2ef',
    bookInteractiveAccent: '#ffc296',
    bookTableHeadBg: '#2a3b4f',
    bookTableHeadText: '#9fe2ef',
    bookTableCellBg: '#272937',
    bookQuestionTableHeadBg: '#2a3b4f',
    bookQuestionTableHeadText: '#9fe2ef',
    bookTocBg: '#2a3b4f',
    bookTocHeading: '#9fe2ef',
    bookTocLink: '#ffffff',
    bookTocBorder: '#9fe2ef',
    bookTocCtaBg: '#ffc296',
    bookTocCtaText: '#272937',
  },
  // Modo 2 — preto / branco
  2: {
    bookBgOuter: '#000000',
    bookBgPage: '#000000',
    bookTextBody: '#ffffff',
    bookTextH3: '#fde047',
    bookTextH4: '#a7f3d0',
    bookChapterBorder: '#ffffff',
    bookChapterLabel: '#e5e5e5',
    bookChapterTitle: '#ffffff',
    paginationBg: '#262626',
    paginationText: '#ffffff',
    questionMarker: '#fde047',
    bookFocusRing: '#ffffff',
    bookTableBorder: '#ffffff',
    bookInteractiveAccent: '#fde047',
    bookTableHeadBg: '#171717',
    bookTableHeadText: '#ffffff',
    bookTableCellBg: '#000000',
    bookQuestionTableHeadBg: '#171717',
    bookQuestionTableHeadText: '#ffffff',
    bookTocBg: '#171717',
    bookTocHeading: '#fde047',
    bookTocLink: '#ffffff',
    bookTocBorder: '#404040',
    bookTocCtaBg: '#fde047',
    bookTocCtaText: '#000000',
  },
  // Modo 3 — creme / texto escuro
  3: {
    bookBgOuter: '#e7e5e4',
    bookBgPage: '#faf8f5',
    bookTextBody: '#292524',
    bookTextH3: '#9f1239',
    bookTextH4: '#0f766e',
    bookChapterBorder: '#0d9488',
    bookChapterLabel: '#44403c',
    bookChapterTitle: '#1c1917',
    paginationBg: '#f5d0fe',
    paginationText: '#1c1917',
    questionMarker: '#9f1239',
    bookFocusRing: '#0d9488',
    bookTableBorder: '#57534e',
    bookInteractiveAccent: '#0f766e',
    bookTableHeadBg: '#e7e5e4',
    bookTableHeadText: '#0E3B5D',
    bookTableCellBg: '#faf8f5',
    bookQuestionTableHeadBg: '#e7e5e4',
    bookQuestionTableHeadText: '#0E3B5D',
    bookTocBg: '#EEE6D4',
    bookTocHeading: '#0E3B5D',
    bookTocLink: '#144468',
    bookTocBorder: '#e2e8f0',
    bookTocCtaBg: '#BF3154',
    bookTocCtaText: '#ffffff',
  },
};

const DEFAULT_THEME: ThemeLayer = {
  bookBgOuter: '#e5e7eb',
  bookBgPage: '#ffffff',
  bookTextBody: '#000000',
  bookTextH3: '#BF3154',
  bookTextH4: '#00776E',
  bookChapterBorder: '#00A99D',
  bookChapterLabel: '#0E3B5D',
  bookChapterTitle: '#1e293b',
  paginationBg: '#F8B9CB',
  paginationText: '#000000',
  questionMarker: '#BF3154',
  bookFocusRing: '#2563eb',
  bookTableBorder: '#0E3B5D',
  bookInteractiveAccent: '#d1d5db',
  bookTableHeadBg: '#334155',
  bookTableHeadText: '#ffffff',
  bookTableCellBg: '#ffffff',
  bookQuestionTableHeadBg: '#ffffff',
  bookQuestionTableHeadText: '#0E3B5D',
  bookTocBg: '#EEE6D4',
  bookTocHeading: '#0E3B5D',
  bookTocLink: '#144468',
  bookTocBorder: '#e2e8f0',
  bookTocCtaBg: '#BF3154',
  bookTocCtaText: '#ffffff',
};

const BODY_FONT_STACK: Record<AccessibilityPreferences['bodyFont'], string> = {
  ubuntu: "'Ubuntu', ui-sans-serif, system-ui, sans-serif",
  atkinson:
    "'Atkinson Hyperlegible', 'Atkinson', ui-sans-serif, system-ui, sans-serif",
};

const BASE_BODY_PX = 16;
const BASE_H2_PX = 36;
const BASE_H3_PX = 26;
const BASE_H4_PX = 20;
const BASE_SMALL_PX = 14;
const BASE_NOTE_PX = 13;
const BASE_CAPTION_PX = 10;
const BASE_CTA_PX = 12;
const BASE_COVER_TITLE_PX = 48;
const BASE_COVER_SUBTITLE_PX = 24;
const BASE_CHOICE_CONTROL_PX = 32;

export function getThemeLayer(mode: ContrastMode): ThemeLayer {
  if (mode === 'default') return DEFAULT_THEME;
  return CONTRAST_THEMES[mode];
}

export function buildBookReadingStyle(
  prefs: AccessibilityPreferences
): CSSProperties {
  const layer = getThemeLayer(prefs.contrastMode);
  const scale = prefs.fontScale;
  const lh = 1.5 * prefs.lineHeightScale;
  const fontW = prefs.boldBody ? 700 : 400;
  const headingW = prefs.boldBody ? 900 : 700;
  const coverHeadingW = prefs.boldBody ? 900 : 800;
  const headingFont =
    prefs.bodyFont === 'atkinson'
      ? BODY_FONT_STACK[prefs.bodyFont]
      : "'hwt-artz', sans-serif";

  return {
    '--book-bg-outer': layer.bookBgOuter,
    '--book-bg-page': layer.bookBgPage,
    '--book-text-body': layer.bookTextBody,
    '--book-text-h3': layer.bookTextH3,
    '--book-text-h4': layer.bookTextH4,
    '--book-chapter-border': layer.bookChapterBorder,
    '--book-chapter-label': layer.bookChapterLabel,
    '--book-chapter-title': layer.bookChapterTitle,
    '--pagination-bg': layer.paginationBg,
    '--pagination-text': layer.paginationText,
    '--book-question-marker': layer.questionMarker,
    '--book-focus-ring': layer.bookFocusRing,
    '--book-table-border': layer.bookTableBorder,
    '--book-interactive-accent': layer.bookInteractiveAccent,
    '--book-table-head-bg': layer.bookTableHeadBg,
    '--book-table-head-text': layer.bookTableHeadText,
    '--book-table-cell-bg': layer.bookTableCellBg,
    '--book-question-table-head-bg': layer.bookQuestionTableHeadBg,
    '--book-question-table-head-text': layer.bookQuestionTableHeadText,
    '--book-toc-bg': layer.bookTocBg,
    '--book-toc-heading': layer.bookTocHeading,
    '--book-toc-link': layer.bookTocLink,
    '--book-toc-border': layer.bookTocBorder,
    '--book-toc-cta-bg': layer.bookTocCtaBg,
    '--book-toc-cta-text': layer.bookTocCtaText,
    '--book-font-body': BODY_FONT_STACK[prefs.bodyFont],
    '--book-font-heading': headingFont,
    '--book-body-size': `${BASE_BODY_PX * scale}px`,
    '--book-h2-size': `${BASE_H2_PX * scale}px`,
    '--book-h3-size': `${BASE_H3_PX * scale}px`,
    '--book-h4-size': `${BASE_H4_PX * scale}px`,
    '--book-small-size': `${BASE_SMALL_PX * scale}px`,
    '--book-note-size': `${BASE_NOTE_PX * scale}px`,
    '--book-caption-size': `${BASE_CAPTION_PX * scale}px`,
    '--book-cta-size': `${BASE_CTA_PX * scale}px`,
    '--book-cover-title-size': `${BASE_COVER_TITLE_PX * scale}px`,
    '--book-cover-subtitle-size': `${BASE_COVER_SUBTITLE_PX * scale}px`,
    '--book-choice-control-size': `${BASE_CHOICE_CONTROL_PX * scale}px`,
    '--book-line-height': String(lh),
    '--book-body-weight': String(fontW),
    '--book-heading-weight': String(headingW),
    '--book-cover-heading-weight': String(coverHeadingW),
  } as CSSProperties;
}
