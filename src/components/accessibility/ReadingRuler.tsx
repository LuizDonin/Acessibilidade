import { useEffect, useState } from 'react';

type ReadingRulerProps = {
  enabled: boolean;
};

export function ReadingRuler({ enabled }: ReadingRulerProps) {
  const [y, setY] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  );

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => setY(e.clientY);
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 z-[60] border-t-2 border-sky-400 shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
      style={{ top: y }}
      aria-hidden
    />
  );
}
