import { ReactNode } from 'react';
import { QuestionNumber } from './QuestionNumber';

interface QuestionWrapperProps {
  number?: number;
  question: string;
  children?: ReactNode;
  className?: string;
  useHTML?: boolean;
}

/**
 * Componente wrapper reutilizável para questões
 */
export function QuestionWrapper({
  number,
  question,
  children,
  className = '',
  useHTML = false,
}: QuestionWrapperProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <p className="mb-4">
        <QuestionNumber number={number} />
        {useHTML ? (
          <span
            style={{ color: 'var(--book-text-body, #000000)' }}
            dangerouslySetInnerHTML={{ __html: question }}
          />
        ) : (
          <span style={{ color: 'var(--book-text-body, #000000)' }}>{question}</span>
        )}
      </p>
      {children}
    </div>
  );
}

