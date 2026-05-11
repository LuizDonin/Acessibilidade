import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildBookReadingStyle,
  DEFAULT_ACCESSIBILITY_PREFS,
} from '../constants/bookReadingTheme';
import type { AccessibilityPreferences } from '../types/accessibility';
import {
  loadAccessibilityPreferences,
  saveAccessibilityPreferences,
} from '../utils/accessibilityStorage';

export const FONT_SCALE_STEP = 0.1;
export const FONT_SCALE_MIN = 0.8;
export const FONT_SCALE_MAX = 1.5;

export const LINE_HEIGHT_STEP = 0.05;
export const LINE_HEIGHT_MIN = 1;
export const LINE_HEIGHT_MAX = 1.4;

export function useAccessibilityPreferences() {
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(() =>
    loadAccessibilityPreferences()
  );

  useEffect(() => {
    saveAccessibilityPreferences(prefs);
  }, [prefs]);

  const bookStyle = useMemo(() => buildBookReadingStyle(prefs), [prefs]);

  const setContrastMode = useCallback(
    (contrastMode: AccessibilityPreferences['contrastMode']) => {
      setPrefs((p) => ({ ...p, contrastMode }));
    },
    []
  );

  const bumpFontScale = useCallback((delta: number) => {
    setPrefs((p) => ({
      ...p,
      fontScale: Math.min(
        FONT_SCALE_MAX,
        Math.max(FONT_SCALE_MIN, Math.round((p.fontScale + delta) * 10) / 10)
      ),
    }));
  }, []);

  const toggleBoldBody = useCallback(() => {
    setPrefs((p) => ({ ...p, boldBody: !p.boldBody }));
  }, []);

  const cycleBodyFont = useCallback(() => {
    setPrefs((p) => {
      if (p.bodyFont === 'ubuntu') return { ...p, bodyFont: 'atkinson' };
      return { ...p, bodyFont: 'ubuntu' };
    });
  }, []);

  const bumpLineHeight = useCallback((delta: number) => {
    setPrefs((p) => ({
      ...p,
      lineHeightScale: Math.min(
        LINE_HEIGHT_MAX,
        Math.max(
          LINE_HEIGHT_MIN,
          Math.round((p.lineHeightScale + delta) * 100) / 100
        )
      ),
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setPrefs({ ...DEFAULT_ACCESSIBILITY_PREFS });
  }, []);

  const updatePrefs = useCallback(
    (patch: Partial<AccessibilityPreferences>) => {
      setPrefs((p) => ({ ...p, ...patch }));
    },
    []
  );

  return {
    prefs,
    setPrefs,
    bookStyle,
    setContrastMode,
    bumpFontScale,
    toggleBoldBody,
    cycleBodyFont,
    bumpLineHeight,
    resetToDefaults,
    updatePrefs,
  };
}
