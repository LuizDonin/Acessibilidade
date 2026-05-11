function TrilhaTexto() {
  return (
    <div className="flex items-center gap-3 my-6">
      <img
        src="images/trilhaTexto.png"
        alt="Ilustração decorativa da seção Na trilha do texto."
        className="object-contain"
      />
      <h2
        style={{
          // Alinha com as cores do Modo 1 (azul claro) via tema.
          color: 'var(--book-chapter-label, #0E3B5D)',
          fontFamily: 'hwt-artz',
          fontSize: 'var(--book-h3-size, 26px)',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal',
        }}
      >
        Na trilha do texto
      </h2>
    </div>
  );
}

export default TrilhaTexto;

