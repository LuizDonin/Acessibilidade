import { UserAnswers } from '../types/questions';

interface Criterio {
  id: string;
  nome: string;
  pergunta: string;
}

interface CriteriosAvaliacaoProps {
  title?: string;
  instanceId: string; // ID único para esta instância da tabela
  criterios: Criterio[];
  userAnswers?: UserAnswers;
  onAnswerChange?: (criterioId: string, answer: boolean) => void;
}

function CriteriosAvaliacao({
  title = 'CRITÉRIOS DE AVALIAÇÃO',
  instanceId,
  criterios,
  userAnswers = {},
  onAnswerChange,
}: CriteriosAvaliacaoProps) {
  const handleAnswerChange = (criterioId: string, answer: boolean) => {
    if (onAnswerChange) {
      // Usa instanceId como prefixo para tornar o ID único
      const uniqueId = `${instanceId}_${criterioId}`;
      onAnswerChange(uniqueId, answer);
    }
  };

  return (
    <div className="my-6 overflow-x-auto -mx-4 md:mx-0">
      <div className="min-w-full inline-block">
        <table
          className="book-question-table w-full border-collapse"
          style={{
            border: '3px solid var(--book-table-border, #0E3B5D)',
            fontFamily: 'var(--book-font-body, Ubuntu, sans-serif)',
            minWidth: '100%',
          }}
        >
          <thead>
            <tr>
              <th
                colSpan={2}
                className="align-middle p-2 md:p-3"
                style={{
                  border: '3px solid var(--book-table-border, #0E3B5D)',
                  backgroundColor: 'var(--book-bg-page, #ffffff)',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <h3
                  className="m-0 font-bold text-sm md:text-base"
                  style={{
                    color: 'var(--book-text-h3, #BF3154)',
                  }}
                >
                  {title}
                </h3>
              </th>

              <th
                className="align-middle p-2 md:p-3 text-center"
                style={{
                  border: '3px solid var(--book-table-border, #0E3B5D)',
                  backgroundColor: 'var(--book-bg-page, #ffffff)',
                  verticalAlign: 'middle',
                }}
              >
                <span className="inline-flex items-center justify-center text-base md:text-2xl">
                  <img
                    src="images/iconeFeliz.png"
                    alt="Critério atendido"
                    className="h-4 w-4 object-contain md:h-12 md:w-12"
                  />
                </span>
              </th>
              <th
                className="align-middle p-2 md:p-3 text-center"
                style={{
                  border: '3px solid var(--book-table-border, #0E3B5D)',
                  backgroundColor: 'var(--book-bg-page, #ffffff)',
                  verticalAlign: 'middle',
                }}
              >
                <span className="inline-flex items-center justify-center text-base md:text-2xl">
                  <img
                    src="images/iconeTriste.png"
                    alt="Critério não atendido"
                    className="h-4 w-4 object-contain md:h-12 md:w-12"
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {criterios.map((criterio) => {
              // Usa instanceId como prefixo para tornar o ID único
              const uniqueId = `${instanceId}_${criterio.id}`;
              const answer = userAnswers[uniqueId] as boolean | undefined;
              const isYes = answer === true;
              const isNo = answer === false;

              return (
                <tr key={criterio.id}>
                  <td
                    className="p-2 md:p-3 font-semibold text-sm md:text-base text-center"
                    style={{
                      border: '3px solid var(--book-table-border, #0E3B5D)',
                      color: 'var(--book-chapter-label, #0E3B5D)',
                      backgroundColor: 'var(--book-bg-page, #ffffff)',
                      fontFamily: 'var(--book-font-body, Ubuntu, sans-serif)',
                      fontSize: '16px',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      textAlign: 'center',
                    }}
                  >
                    {criterio.nome}
                  </td>
                  <td
                    className="p-2 md:p-3 text-xs md:text-base"
                    style={{
                      border: '3px solid var(--book-table-border, #0E3B5D)',
                      color: 'var(--book-text-body, #0E3B5D)',
                      backgroundColor: 'var(--book-bg-page, #ffffff)',
                      fontFamily: 'var(--book-font-body)',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                    }}
                  >
                    {criterio.pergunta}
                  </td>
                  <td
                    className="p-2 md:p-3 text-center"
                    style={{
                      border: '3px solid var(--book-table-border, #0E3B5D)',
                      backgroundColor: 'var(--book-bg-page, #ffffff)',
                    }}
                  >
                    <input
                      type="radio"
                      name={uniqueId}
                      checked={isYes}
                      onChange={() => handleAnswerChange(criterio.id, true)}
                      className="w-3 h-3 md:w-4 md:h-4"
                      style={{
                        accentColor: 'var(--book-interactive-accent, #BF3154)',
                      }}
                    />
                  </td>
                  <td
                    className="p-2 md:p-3 text-center"
                    style={{
                      border: '3px solid var(--book-table-border, #0E3B5D)',
                      backgroundColor: 'var(--book-bg-page, #ffffff)',
                    }}
                  >
                    <input
                      type="radio"
                      name={uniqueId}
                      checked={isNo}
                      onChange={() => handleAnswerChange(criterio.id, false)}
                      className="w-3 h-3 md:w-4 md:h-4"
                      style={{
                        accentColor: 'var(--book-interactive-accent, #BF3154)',
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CriteriosAvaliacao;

