import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { ContrastMode } from '../types/accessibility';

interface TeacherButtonProps {
    title?: string;
    content?: React.ReactNode;
    answers?: React.ReactNode;
    visible?: boolean; // Controla a visibilidade do botão
    /** No Modo 1 de acessibilidade, aplica fundo #272937 e destaque #ffc296 (com foco #9fe2ef via CSS). */
    contrastMode?: ContrastMode | 'default';
}

function TeacherButton({
    title,
    content,
    answers,
    visible = true,
    contrastMode = 'default',
}: TeacherButtonProps) {
    // Se visible for false, não renderiza nada
    if (!visible) {
        return null;
    }
    const [isOpen, setIsOpen] = useState(false);
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
        fontWeight: 700,
        lineHeight: '1.4em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        margin: '1em 0.4em 1.4em 1.4em',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        background: 'transparent url("images/iconTeacher.svg") no-repeat center',
        backgroundSize: '100%',
    };

    const modo1IconStyle: CSSProperties = {
        position: 'absolute',
        left: '-15px',
        top: '54%',
        transform: 'translateY(-50%)',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'var(--book-bg-page)',
        backgroundImage: 'url("images/infoprofessor.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '35%',
        border: '2px solid var(--book-interactive-accent)',
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={
                    isModo1
                        ? 'professor-button professor-button--a11y-modo1'
                        : 'professor-button'
                }
                style={isModo1 ? modo1ButtonStyle : defaultButtonStyle}
                onMouseEnter={(e) => {
                    if (isModo1) {
                        e.currentTarget.style.opacity = '0.92';
                        return;
                    }
                    e.currentTarget.style.backgroundColor = '#9C2F4B';
                    e.currentTarget.style.boxShadow = '0px 2px 0px #7A2440';
                }}
                onMouseLeave={(e) => {
                    if (isModo1) {
                        e.currentTarget.style.opacity = '1';
                        return;
                    }
                    e.currentTarget.style.backgroundColor = '#BF3154';
                    e.currentTarget.style.boxShadow = '0px 4px 0px #9C2F4B';
                }}
            >
                <div
                    aria-hidden
                    style={isModo1 ? modo1IconStyle : defaultIconStyle}
                />
                PARA O PROFESSOR
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="teacher-modal-title"
                        className={`teacher-modal-panel mx-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg p-8 shadow-2xl ${
                            isModo1 ? 'teacher-modal-modo1' : 'bg-white'
                        }`}
                        style={
                            isModo1
                                ? {
                                      backgroundColor: 'var(--book-bg-page)',
                                      color: 'var(--book-text-body)',
                                      border: '2px solid var(--book-interactive-accent)',
                                      boxShadow:
                                          '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
                                  }
                                : undefined
                        }
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-6 flex items-center justify-between gap-3">
                            <h3
                                id="teacher-modal-title"
                                className="text-2xl font-bold"
                                style={{
                                    color: isModo1
                                        ? 'var(--book-chapter-title)'
                                        : '#BF3154',
                                    fontFamily: "'hwt-artz', sans-serif",
                                    fontSize: 'var(--book-h3-size, 26px)',
                                    lineHeight: 'normal',
                                }}
                            >
                                PARA O PROFESSOR
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className={
                                    isModo1
                                        ? 'rounded text-2xl font-bold leading-none transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--book-focus-ring)]'
                                        : 'text-2xl font-bold leading-none text-slate-500 hover:text-slate-700'
                                }
                                style={
                                    isModo1
                                        ? { color: 'var(--book-text-body)' }
                                        : undefined
                                }
                                aria-label="Fechar"
                            >
                                ×
                            </button>
                        </div>

                        {title && (
                            <h4
                                className={`mb-4 text-xl font-semibold ${
                                    isModo1 ? '' : 'text-slate-700'
                                }`}
                                style={
                                    isModo1
                                        ? { color: 'var(--book-text-h4)' }
                                        : undefined
                                }
                            >
                                {title}
                            </h4>
                        )}

                        {content && (
                            <div className="mb-6">
                                <div
                                    className="prose max-w-none teacher-modal-body"
                                    style={
                                        isModo1
                                            ? {
                                                  color: 'var(--book-text-body)',
                                                  fontFamily:
                                                      'var(--book-font-body)',
                                                  fontSize:
                                                      'var(--book-body-size, 16px)',
                                                  lineHeight:
                                                      'var(--book-line-height, 1.5)',
                                                  fontWeight:
                                                      'var(--book-body-weight, 400)',
                                              }
                                            : { color: '#000000' }
                                    }
                                >
                                    {content}
                                </div>
                            </div>
                        )}

                        {answers && (
                            <div>
                                <h5
                                    className="mb-3 text-lg font-semibold"
                                    style={{
                                        color: isModo1
                                            ? 'var(--book-text-h4)'
                                            : '#000000',
                                    }}
                                >
                                    Respostas:
                                </h5>
                                <div
                                    className="prose max-w-none teacher-modal-body"
                                    style={
                                        isModo1
                                            ? {
                                                  color: 'var(--book-text-body)',
                                                  fontFamily:
                                                      'var(--book-font-body)',
                                                  fontSize:
                                                      'var(--book-body-size, 16px)',
                                                  lineHeight:
                                                      'var(--book-line-height, 1.5)',
                                                  fontWeight:
                                                      'var(--book-body-weight, 400)',
                                              }
                                            : { color: '#000000' }
                                    }
                                >
                                    {answers}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default TeacherButton;