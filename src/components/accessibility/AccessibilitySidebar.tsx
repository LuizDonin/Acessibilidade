import { useEffect, useId, useState } from 'react';
import type { AccessibilityPreferences, ContrastMode } from '../../types/accessibility';
import {
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  FONT_SCALE_STEP,
} from '../../hooks/useAccessibilityPreferences';

const bodyFontLabel: Record<AccessibilityPreferences['bodyFont'], string> = {
  ubuntu: 'Ubuntu',
  atkinson: 'Atkinson',
};

function IconEyeOff({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconChevron({ up, right }: { up?: boolean; right?: boolean }) {
  let rotation = '';
  if (up) rotation = 'rotate-180';
  else if (right) rotation = '-rotate-90';
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={rotation}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

type AccessibilitySidebarProps = {
  prefs: AccessibilityPreferences;
  updatePrefs: (patch: Partial<AccessibilityPreferences>) => void;
  setContrastMode: (m: ContrastMode) => void;
  bumpFontScale: (delta: number) => void;
  toggleBoldBody: () => void;
  cycleBodyFont: () => void;
  resetToDefaults: () => void;
};

const panelClass =
  'fixed right-0 top-0 z-[70] flex h-full w-[min(100vw,320px)] flex-col bg-[#0d1b2a] text-white shadow-2xl';

const sectionTitle = 'text-sm font-semibold tracking-wide text-white/95 mb-3';

const squareBtn =
  'flex min-h-[76px] flex-col items-center justify-center gap-1 rounded border border-slate-600 bg-slate-800/90 px-2 py-2 text-center text-xs font-medium text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400';

const contrastModeBtn =
  'flex min-w-0 flex-1 flex-col gap-2 rounded-lg border-2 p-1.5 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400';

type ContrastModeCardProps = {
  label: string;
  aaColor: string;
  bgColor: string;
  swatches: string[];
};

function ContrastModeCard({ label, aaColor, bgColor, swatches }: ContrastModeCardProps) {
  return (
    <>
      <div
        className="flex h-[98px] w-full items-center justify-between rounded-md border border-white/60 px-3"
        style={{ backgroundColor: bgColor }}
      >
        <span
          className="text-5xl font-medium leading-none tracking-tight"
          style={{ color: aaColor }}
          aria-hidden
        >
          Aa
        </span>
        <div className="flex flex-col gap-1" aria-hidden>
          {swatches.map((color, idx) => (
            <span
              key={idx}
              className="h-4 w-4 rounded-md border border-white/70"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <span className="text-sm font-medium leading-none text-white">{label}</span>
    </>
  );
}

const SWATCH_DEFAULT = ['#334155', '#f8b9cb', '#00a99d', '#0e3b5d'] as const;
const SWATCH_MODO1 = ['#272937', '#2a3b4f', '#9fe2ef', '#ffc296'] as const;

const visionBtn =
  'flex min-h-[68px] flex-col items-center justify-center gap-0.5 rounded border border-slate-600 bg-slate-800/90 px-1 py-1.5 text-center text-[10px] font-medium leading-tight text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-40';

export function AccessibilitySidebar({
  prefs,
  updatePrefs,
  setContrastMode,
  bumpFontScale,
  toggleBoldBody,
  cycleBodyFont,
  resetToDefaults,
}: AccessibilitySidebarProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const contrastActive = (m: ContrastMode) => {
    if (m === 'default') return prefs.contrastMode === 'default';
    return prefs.contrastMode === m;
  };

  return (
    <>
      <button
        type="button"
        className="fixed right-0 top-1/2 z-[70] flex -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-l-lg bg-[#0d1b2a] px-2 py-4 text-white shadow-lg transition hover:bg-[#152238] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        style={{ display: open ? 'none' : 'flex' }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Abrir painel de acessibilidade"
        onClick={() => setOpen(true)}
      >
        <IconEyeOff className="shrink-0" />
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-panel-title"
        className={panelClass}
        style={{ display: open ? 'flex' : 'none' }}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-700 px-3 py-3">
          <button
            type="button"
            className="rounded p-1 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Recolher painel"
            onClick={() => setOpen(false)}
          >
            <IconChevron right />
          </button>
          <h2
            id="a11y-panel-title"
            className="flex-1 text-center text-sm font-semibold uppercase tracking-wide underline decoration-white/40 underline-offset-4"
          >
            Acessibilidade
          </h2>
          <button
            type="button"
            className="rounded p-1 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Restaurar configurações padrão de leitura"
            title="Restaurar padrões"
            onClick={() => {
              resetToDefaults();
            }}
          >
            <IconEyeOff className="shrink-0" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 pb-8">
          <section className="mb-6">
            <h3 className={sectionTitle}>Alto contraste</h3>
            <div className="flex gap-2">
              <button
                type="button"
                className={`${contrastModeBtn} ${
                  contrastActive('default')
                    ? 'border-sky-400 bg-slate-800'
                    : 'border-slate-600 bg-slate-900/80'
                }`}
                onClick={() => setContrastMode('default')}
              >
                <ContrastModeCard
                  label="Padrão"
                  bgColor="#e5e7eb"
                  aaColor="#4b5563"
                  swatches={[...SWATCH_DEFAULT]}
                />
              </button>
              <button
                type="button"
                className={`${contrastModeBtn} ${
                  contrastActive(1)
                    ? 'border-sky-400 bg-slate-800'
                    : 'border-slate-600 bg-slate-900/80'
                }`}
                onClick={() => setContrastMode(1)}
              >
                <ContrastModeCard
                  label="Modo 1"
                  bgColor="#272937"
                  aaColor="#f3f4f6"
                  swatches={[...SWATCH_MODO1]}
                />
              </button>
            </div>
          </section>

          <section className="mb-6">
            <h3 className={sectionTitle}>Dislexia e neurodivergências</h3>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                className={squareBtn}
                onClick={() => cycleBodyFont()}
              >
                <span className="text-lg font-bold" aria-hidden>
                  Aa
                </span>
                <span>Trocar fonte</span>
                <span className="text-[10px] text-white/70">
                  {bodyFontLabel[prefs.bodyFont]}
                </span>
              </button>
            </div>
          </section>

          <section className="mb-6">
            <h3 className={sectionTitle}>Baixa visão</h3>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                className={visionBtn}
                onClick={() => bumpFontScale(FONT_SCALE_STEP)}
                disabled={prefs.fontScale >= FONT_SCALE_MAX}
              >
                <span className="text-lg font-bold leading-none">A+</span>
                <span>Aumentar +10%</span>
              </button>
              <button
                type="button"
                className={visionBtn}
                onClick={() => bumpFontScale(-FONT_SCALE_STEP)}
                disabled={prefs.fontScale <= FONT_SCALE_MIN}
              >
                <span className="text-lg font-bold leading-none">A−</span>
                <span>Diminuir -10%</span>
              </button>
              <button
                type="button"
                className={`${visionBtn} ${
                  prefs.boldBody ? 'ring-2 ring-sky-400' : ''
                }`}
                aria-pressed={prefs.boldBody}
                onClick={() => toggleBoldBody()}
              >
                <span className="text-lg font-bold leading-none">B</span>
                <span>Negrito</span>
              </button>
            </div>
            <p className="mt-3 text-xs text-white/60">
              Tamanho da fonte: {Math.round(prefs.fontScale * 100)}%.
            </p>
            <button
              type="button"
              className="mt-3 w-full rounded border border-slate-500 bg-slate-800/90 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              onClick={() => resetToDefaults()}
            >
              Resetar tudo
            </button>
          </section>

          <div className="my-4 border-t border-slate-700" />

          <section>
            <h3 className={sectionTitle}>Ferramentas gerais</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`${squareBtn} ${
                  prefs.rulerEnabled ? 'ring-2 ring-sky-400' : ''
                }`}
                aria-pressed={prefs.rulerEnabled}
                onClick={() => {
                  const next = !prefs.rulerEnabled;
                  updatePrefs({
                    rulerEnabled: next,
                    ...(next ? { readingFocusEnabled: false } : {}),
                  });
                }}
              >
                <span className="text-lg" aria-hidden>
                  📏
                </span>
                <span>Régua</span>
              </button>
              <button
                type="button"
                className={`${squareBtn} ${
                  prefs.readingFocusEnabled ? 'ring-2 ring-sky-400' : ''
                }`}
                aria-pressed={prefs.readingFocusEnabled}
                onClick={() => {
                  const next = !prefs.readingFocusEnabled;
                  updatePrefs({
                    readingFocusEnabled: next,
                    ...(next ? { rulerEnabled: false } : {}),
                  });
                }}
              >
                <span className="text-lg" aria-hidden>
                  ◎
                </span>
                <span>Foco de leitura</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
