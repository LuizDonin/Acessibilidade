import { useEffect, useState } from 'react';

const BAND_PX = 140;
const HALF = BAND_PX / 2;

type ReadingFocusProps = {
  enabled: boolean;
};

export function ReadingFocus({ enabled }: ReadingFocusProps) {
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

  const topH = Math.max(0, y - HALF);
  const bottomTop = y + HALF;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[55]"
      aria-hidden
    >
      <div
        className="absolute left-0 right-0 bg-black/45"
        style={{ top: 0, height: topH }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 bg-black/45"
        style={{ top: bottomTop }}
      />
    </div>
  );
}
