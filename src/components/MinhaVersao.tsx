function MinhaVersao() {
    return (
      <div className="flex items-center gap-3 my-6">
        <img
          src="images/minhaVersao.png"
          alt="Ilustração decorativa da seção Minha versão."
          className="object-contain"
        />
        <h2
          style={{
            color: 'var(--book-chapter-label, #0E3B5D)',
            fontFamily: 'hwt-artz',
            fontSize: '26px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
        >
          Minha versão
        </h2>
      </div>
    );
  }
  
  export default MinhaVersao;