import type { ContrastMode } from '../types/accessibility';

function TableOfContents({ contrastMode = 'default' }: { contrastMode?: ContrastMode }) {
  const isModo1 = contrastMode === 1;
  const scrollToChapter = (chapterId: string) => {
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const linkStyle = {
    fontSize: 'var(--book-body-size, 16px)',
    fontStyle: 'normal' as const,
    fontWeight: 'var(--book-body-weight, 400)',
    lineHeight: 'var(--book-line-height, 1.5)',
  };

  return (
    <nav className="book-toc-nav mb-12 p-6 rounded-lg border">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <h2
              className="font-hwtArtz"
              style={{
                fontSize: 'var(--book-h3-size, 28px)',
                fontStyle: 'normal',
                fontWeight: 'var(--book-cover-heading-weight, 800)',
                lineHeight: 'normal',
              }}
            >
              SUMÁRIO
            </h2>
          </div>
          <ol className="space-y-3">
            <li>
              <button
                type="button"
                onClick={() => scrollToChapter('chapter1')}
                className="book-toc-link text-left w-full font-Ubuntu flex items-center gap-2"
                style={linkStyle}
              >
                <img
                  src="images/Union.svg"
                  alt=""
                  className="w-4 h-4 object-contain"
                  aria-hidden
                />
                <span>Capítulo 1:</span> <span>Notícias</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToChapter('chapter2')}
                className="book-toc-link text-left w-full font-Ubuntu flex items-center gap-2"
                style={linkStyle}
              >
                <img
                  src="images/Union.svg"
                  alt=""
                  className="w-4 h-4 object-contain"
                  aria-hidden
                />
                <span>Capítulo 2:</span> <span>Fábulas</span>
              </button>
            </li>
          </ol>
        </div>

        <div
          className="hidden md:block"
          style={{
            backgroundColor: 'var(--book-table-border, #0E3B5D)',
            width: '3px',
          }}
        />

        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 flex flex-col gap-3">
            <p
              className="book-small-text font-ubuntu"
              style={{
                color: 'var(--book-chapter-label, #0E3B5D)',
                fontWeight: 'var(--book-body-weight, 400)',
              }}
            >
              Clique no botão abaixo para acessar o tutorial de uso do livro digital
            </p>
            <a
              href="https://go.plataformaconx.com.br/bYxAg7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <button
                type="button"
                style={
                  isModo1
                    ? {
                        padding: '10px 30px',
                        backgroundColor: 'var(--book-bg-page)',
                        boxShadow: 'none',
                        borderRadius: '30px',
                        color: 'var(--book-interactive-accent)',
                        fontFamily: 'var(--book-font-body)',
                        fontSize: 'var(--book-cta-size, 12px)',
                        fontWeight: 'var(--book-heading-weight, 700)',
                        lineHeight: '1.4em',
                        textTransform: 'uppercase',
                        border: '2px solid var(--book-interactive-accent)',
                        cursor: 'pointer',
                      }
                    : {
                        padding: '10px 30px',
                        backgroundColor: 'var(--book-toc-cta-bg, #BF3154)',
                        boxShadow: '0px 4px 0px #9C2F4B',
                        borderRadius: '30px',
                        color: 'var(--book-toc-cta-text, #ffffff)',
                        fontFamily: 'var(--book-font-body)',
                        fontSize: 'var(--book-cta-size, 12px)',
                        fontWeight: 'var(--book-heading-weight, 700)',
                        lineHeight: '1.4em',
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer',
                      }
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.92';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                TUTORIAL
              </button>
            </a>
          </div>

          <div className="flex flex-col items-center self-center md:self-auto">
            <a
              href="https://go.plataformaconx.com.br/bYxAg7"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
              aria-label="Abrir tutorial pelo QR Code"
            >
              {isModo1 ? (
                <span
                  className="book-toc-qr-modo1 h-20 w-20 shrink-0 md:h-28 md:w-28"
                  aria-hidden
                />
              ) : (
                <img
                  src="images/qrCode.svg"
                  alt=""
                  className="h-20 w-20 object-contain md:h-28 md:w-28"
                  aria-hidden
                />
              )}
            </a>
            <span
              className="book-small-text mt-2"
              style={{
                color: 'var(--book-chapter-label, #0E3B5D)',
              }}
            >
              se preferir, leia o QR
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TableOfContents;
