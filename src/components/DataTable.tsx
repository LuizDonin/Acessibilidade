function DataTable() {
  const data = [
    { ano: '3000 a.C.', evento: 'Invenção da escrita', local: 'Mesopotâmia' },
    { ano: '1440', evento: 'Prensa de tipos móveis', local: 'Alemanha' },
    { ano: '1971', evento: 'Primeiro e-mail enviado', local: 'Estados Unidos' },
    { ano: '1989', evento: 'Criação da World Wide Web', local: 'Suíça' },
    { ano: '2007', evento: 'Lançamento do smartphone moderno', local: 'Estados Unidos' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="book-data-table w-full border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left font-semibold">Ano</th>
            <th className="py-3 px-4 text-left font-semibold">Evento</th>
            <th className="py-3 px-4 text-left font-semibold">Local</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="py-3 px-4 font-medium">{row.ano}</td>
              <td className="py-3 px-4">{row.evento}</td>
              <td className="py-3 px-4">{row.local}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
