import { UserAnswers } from '../types/questions';

interface TableRow {
  id: string;
  [key: string]: string | undefined;
}

interface SubQuestion {
  letter: string;
  question: string;
  placeholder?: string;
  correctAnswer?: string;
}

interface QuestionTableFillProps {
  questionId: string;
  title?: string;
  number?: number;
  columns: string[];
  rows: TableRow[];
  subQuestions?: SubQuestion[];
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, fieldId: string, answer: string) => void;
  showResults?: boolean;
}

const cellBorder = '1px solid var(--book-table-border, #0E3B5D)';

function QuestionTableFill({
  questionId,
  title,
  number,
  columns,
  rows,
  subQuestions,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionTableFillProps) {
  return (
    <div className="mb-6">
      {title && (
        <p className="mb-4 font-semibold text-left">
          {number !== undefined && (
            <span style={{ color: 'var(--book-text-h4)', fontWeight: 'bold' }}>
              {number}.{' '}
            </span>
          )}
          <span style={{ color: 'var(--book-text-body)' }}>{title}</span>
        </p>
      )}
      <div className="overflow-x-auto mb-6 -mx-4 md:mx-0">
        <div className="min-w-full inline-block">
          <table
            className="book-question-table w-full border-collapse"
            style={{
              border: '3px solid var(--book-table-border, #0E3B5D)',
              minWidth: '100%',
            }}
          >
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`p-2 md:p-3 font-semibold text-xs md:text-base ${index === 0 ? 'text-center' : 'text-center'}`}
                    style={{
                      border: cellBorder,
                      backgroundColor:
                        'var(--book-question-table-head-bg, #ffffff)',
                      color: 'var(--book-question-table-head-text, #0E3B5D)',
                      fontFamily: 'var(--book-font-body, Ubuntu, sans-serif)',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      textAlign: 'center',
                    }}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const firstColumnKey =
                  Object.keys(row).find((key) => key !== 'id') || 'paragraph';
                const firstColumnValue = row[firstColumnKey] || '';

                return (
                  <tr key={row.id}>
                    <td
                      className="p-2 md:p-3 font-semibold text-xs md:text-base text-center"
                      style={{
                        border: cellBorder,
                        backgroundColor: 'var(--book-table-cell-bg, #ffffff)',
                        color: 'var(--book-text-body, #0E3B5D)',
                        fontFamily: 'var(--book-font-body, Ubuntu, sans-serif)',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        textAlign: 'center',
                      }}
                    >
                      {firstColumnValue}
                    </td>
                    {columns.slice(1).map((_, colIndex) => {
                      const fieldId = `${questionId}_${row.id}_col${colIndex + 1}`;
                      const fieldKeys = Object.keys(row).filter(
                        (key) => key !== 'id' && key !== firstColumnKey
                      );
                      const fieldValue = fieldKeys[colIndex]
                        ? row[fieldKeys[colIndex]]
                        : '';
                      const userAnswer =
                        (userAnswers[fieldId] as string) || fieldValue || '';

                      return (
                        <td
                          key={colIndex}
                          className="p-2 md:p-3"
                          style={{
                            border: cellBorder,
                            backgroundColor:
                              'var(--book-table-cell-bg, #ffffff)',
                          }}
                        >
                          <textarea
                            value={userAnswer}
                            onChange={(e) =>
                              onAnswerChange(questionId, fieldId, e.target.value)
                            }
                            placeholder="Digite aqui..."
                            disabled={showResults}
                            className="w-full p-1 md:p-2 border-0 rounded focus:outline-none resize-y min-h-[50px] md:min-h-[60px] text-xs md:text-base"
                            style={{
                              fontFamily: 'var(--book-font-body, Ubuntu, sans-serif)',
                              color: 'var(--book-text-body, #0E3B5D)',
                              backgroundColor: 'transparent',
                              border: 'none',
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {subQuestions && subQuestions.length > 0 && (
        <div className="space-y-4">
          {subQuestions.map((subQ) => {
            const subQuestionId = `${questionId}_${subQ.letter}`;
            const subUserAnswer = (userAnswers[subQuestionId] as string) || '';

            return (
              <div key={subQ.letter} className="mb-4">
                <p className="mb-2">
                  <span style={{ color: 'var(--book-text-h4)', fontWeight: 'bold' }}>
                    {subQ.letter}){' '}
                  </span>
                  <span style={{ color: 'var(--book-text-body)' }}>
                    {subQ.question}
                  </span>
                </p>
                <textarea
                  value={subUserAnswer}
                  onChange={(e) =>
                    onAnswerChange(questionId, subQuestionId, e.target.value)
                  }
                  placeholder={subQ.placeholder || 'Digite sua resposta aqui...'}
                  disabled={showResults}
                  className="w-full p-3 border rounded-lg focus:outline-none resize-y min-h-[80px]"
                  style={{
                    fontFamily: 'var(--book-font-body, Ubuntu, sans-serif)',
                    borderColor: 'var(--book-interactive-accent, #d1d5db)',
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuestionTableFill;
