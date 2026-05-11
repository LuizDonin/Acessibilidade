import {
  DEFAULT_ACCESSIBILITY_PREFS,
} from '../constants/bookReadingTheme';
import type { AccessibilityPreferences } from '../types/accessibility';

const STORAGE_KEY = 'book_a11y_prefs';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function mergePrefs(raw: unknown): AccessibilityPreferences {
  if (!isRecord(raw)) return { ...DEFAULT_ACCESSIBILITY_PREFS };
  const base = { ...DEFAULT_ACCESSIBILITY_PREFS };
  const fonts = new Set(['ubuntu', 'atkinson']);

  if (typeof raw.contrastMode === 'string' || typeof raw.contrastMode === 'number') {
    const m = raw.contrastMode;
    if (m === 'default') base.contrastMode = 'default';
    else if (m === 1 || m === '1') base.contrastMode = 1;
    else if (m === 2 || m === '2') base.contrastMode = 2;
    else if (m === 3 || m === '3') base.contrastMode = 3;
  }
  if (typeof raw.fontScale === 'number' && Number.isFinite(raw.fontScale)) {
    base.fontScale = Math.min(1.5, Math.max(0.8, raw.fontScale));
  }
  if (typeof raw.bodyFont === 'string') {
    // Compatibilidade com preferências antigas ('system'/'dyslexic' -> 'atkinson').
    const fontKey =
      raw.bodyFont === 'system' || raw.bodyFont === 'dyslexic'
        ? 'atkinson'
        : raw.bodyFont;
    if (fonts.has(fontKey as AccessibilityPreferences['bodyFont'])) {
      base.bodyFont = fontKey as AccessibilityPreferences['bodyFont'];
    }
  }
  if (typeof raw.boldBody === 'boolean') base.boldBody = raw.boldBody;
  if (typeof raw.lineHeightScale === 'number' && Number.isFinite(raw.lineHeightScale)) {
    base.lineHeightScale = Math.min(1.4, Math.max(1, raw.lineHeightScale));
  }
  if (typeof raw.rulerEnabled === 'boolean') base.rulerEnabled = raw.rulerEnabled;
  if (typeof raw.readingFocusEnabled === 'boolean') {
    base.readingFocusEnabled = raw.readingFocusEnabled;
  }
  if (base.rulerEnabled && base.readingFocusEnabled) {
    base.readingFocusEnabled = false;
  }
  return base;
}

export function loadAccessibilityPreferences(): AccessibilityPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...DEFAULT_ACCESSIBILITY_PREFS };
    return mergePrefs(JSON.parse(stored));
  } catch {
    return { ...DEFAULT_ACCESSIBILITY_PREFS };
  }
}

export function saveAccessibilityPreferences(
  prefs: AccessibilityPreferences
): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Erro ao salvar preferências de acessibilidade:', e);
  }
}
