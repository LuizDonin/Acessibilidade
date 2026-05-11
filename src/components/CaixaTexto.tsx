import { ReactNode } from 'react';

interface CaixaTextoProps {
  title?: string;
  children: ReactNode;
  backgroundColor?: string;
  columns?: number;
}

function CaixaTexto({ title, children, backgroundColor, columns }: CaixaTextoProps) {
  const contentStyle: React.CSSProperties = {
    ...(columns && columns > 1 ? {
      // columnCount: columns,
      columnGap: '2rem',
      columnFill: 'auto',
    } : {}),
  };

  return (
    <div
      style={{
        border: '3px solid var(--book-chapter-label, #0E3B5D)',
        position: "relative",
        backgroundColor: backgroundColor || 'transparent',
      }}
      className="p-4 my-4"
    >
      {title && (
        <h4
          style={{
            // Usa a mesma cor dos títulos principais (h3) do tema; no Modo 1 vira azul claro.
            color: 'var(--book-text-h3, #BF3154)',
            fontFamily: 'var(--book-font-heading, hwt-artz, sans-serif)',
            fontSize: 'var(--book-h4-size, 20px)',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
          className="mb-4"
        >
          {title}
        </h4>
      )}
      <div className="texto-corrido" style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

export default CaixaTexto;

