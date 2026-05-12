function ContinuaProximaPagina() {
  return (
    <div className="flex items-center justify-center gap-2" style={{ marginTop: '1.5rem', minHeight: '2rem' }}>
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-[#0E3B5D] px-4 py-2 
                   text-white text-sm font-semibold -bottom-3"
        style={{
          fontFamily: 'var(--book-font-body)',
          fontSize: 'var(--book-small-size, 14px)',
          fontWeight: 'var(--book-body-weight, 400)',
          lineHeight: 'var(--book-line-height, 1.5)',
        }}
      >
        continua na próxima página
      </div>
    </div>
  );
}

export default ContinuaProximaPagina;

