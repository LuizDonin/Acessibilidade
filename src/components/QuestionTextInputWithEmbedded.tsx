import { TextInputQuestion, UserAnswers } from '../types/questions';

interface QuestionTextInputWithEmbeddedProps {
  question: TextInputQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

function QuestionTextInputWithEmbedded({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionTextInputWithEmbeddedProps) {
  const userAnswer = (userAnswers[question.id] as string) || '';

  return (
    <div className="mb-6">
      <p className="mb-4">
        {question.number !== undefined && (
          <span style={{ color: 'var(--book-text-h4)', fontWeight: 'bold' }}>
            {question.number}.{' '}
          </span>
        )}
        <span
          style={{ color: 'var(--book-text-body)' }}
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </p>

      {question.embeddedContent && (
        <div
          className="mb-4 p-4"
          style={{
            border: '1px solid var(--book-chapter-border)',
            borderRadius: '4px',
            fontFamily: 'var(--book-font-body)',
            color: 'var(--book-text-body)',
            whiteSpace: 'pre-line',
            backgroundColor: 'var(--book-bg-page)',
            ...(question.embeddedContentMaxWidth && {
              maxWidth: question.embeddedContentMaxWidth,
              width:
                question.embeddedContentMaxWidth === 'fit-content'
                  ? 'fit-content'
                  : 'auto',
            }),
          }}
        >
          {question.embeddedContent}
        </div>
      )}

      {question.followUpQuestion && (
        <div className="mb-4">
          <ul
            className="mb-2 question-subitems"
            style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}
          >
            <li style={{ color: 'var(--book-text-h3)' }}>
              <span style={{ color: 'var(--book-text-body)' }}>
                {question.followUpQuestion}
              </span>
            </li>
          </ul>
        </div>
      )}

      <textarea
        value={userAnswer}
        onChange={(e) => onAnswerChange(question.id, e.target.value)}
        placeholder={question.placeholder || 'Digite sua resposta aqui...'}
        disabled={showResults}
        className="w-full p-3 border rounded-lg focus:outline-none resize-y min-h-[100px]"
        style={{
          fontFamily: 'inherit',
          color: 'var(--book-text-body)',
          borderColor: 'var(--book-interactive-accent)',
          backgroundColor: 'var(--book-bg-page)',
        }}
      />

      {showResults && question.correctAnswer && (
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <p className="text-sm font-semibold text-gray-700 mb-1">Resposta esperada:</p>
          <p
            className="text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: question.correctAnswer }}
          />
        </div>
      )}
    </div>
  );
}

export default QuestionTextInputWithEmbedded;
