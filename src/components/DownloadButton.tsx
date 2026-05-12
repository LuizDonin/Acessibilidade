import type { CSSProperties } from 'react';
import type { ContrastMode } from '../types/accessibility';

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
  /** No Modo 1 de acessibilidade, aplica fundo escuro com borda/texto laranja. */
  contrastMode?: ContrastMode;
}

function DownloadButton({
  onClick,
  disabled = false,
  contrastMode = 'default',
}: DownloadButtonProps) {
  const isModo1 = contrastMode === 1;

  const defaultButtonStyle: CSSProperties = {
    position: 'relative',
    padding: '10px 30px 10px 45px',
    backgroundColor: '#BF3154',
    boxShadow: '0px 4px 0px #9C2F4B',
    borderRadius: '0 30px 30px 0',
    color: 'white',
    fontFamily: 'var(--book-font-body)',
    fontSize: 'var(--book-cta-size, 12px)',
    fontWeight: 'var(--book-heading-weight, 700)',
    lineHeight: '1.4em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    margin: '1em 0.4em 1.4em 1.4em',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
  };

  const modo1ButtonStyle: CSSProperties = {
    ...defaultButtonStyle,
    backgroundColor: 'var(--book-bg-page)',
    boxShadow: 'none',
    color: 'var(--book-interactive-accent)',
    border: '2px solid var(--book-interactive-accent)',
  };

  const defaultIconStyle: CSSProperties = {
    position: 'absolute',
    left: '-15px',
    top: '54%',
    transform: 'translateY(-50%)',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#BF3154',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundImage: 'url("images/download.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
  };

  const modo1IconStyle: CSSProperties = {
    ...defaultIconStyle,
    backgroundColor: 'var(--book-bg-page)',
    backgroundImage: 'url("images/downloadicon.png")',
    backgroundSize: '70%',
    border: '2px solid var(--book-interactive-accent)',
    boxSizing: 'border-box',
  };

  return (
    <div className="flex">
      <button
        onClick={onClick}
        style={isModo1 ? modo1ButtonStyle : defaultButtonStyle}
        onMouseEnter={(e) => {
          if (!disabled) {
            if (isModo1) {
              e.currentTarget.style.opacity = '0.92';
              return;
            }
            e.currentTarget.style.backgroundColor = '#9C2F4B';
            e.currentTarget.style.boxShadow = '0px 2px 0px #7A2440';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            if (isModo1) {
              e.currentTarget.style.opacity = '1';
              return;
            }
            e.currentTarget.style.backgroundColor = '#BF3154';
            e.currentTarget.style.boxShadow = '0px 4px 0px #9C2F4B';
          }
        }}
        disabled={disabled}
      >
        <div
          aria-hidden
          style={isModo1 ? modo1IconStyle : defaultIconStyle}
        />
        Download
      </button>
    </div>
  );
}

export default DownloadButton;

