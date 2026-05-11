from __future__ import annotations

from pathlib import Path


def main() -> None:
    try:
        from PIL import Image  # type: ignore
    except Exception as e:  # pragma: no cover
        raise SystemExit(
            "Pillow não está instalado.\n"
            "Rode: python -m pip install pillow\n"
        ) from e

    src = Path("public/images/downloadicon.png")
    if not src.exists():
        raise SystemExit(f"Arquivo não encontrado: {src}")

    # Laranja do Modo 1 (var --book-interactive-accent = #ffc296)
    orange = (0xFF, 0xC2, 0x96)

    img = Image.open(src).convert("RGBA")
    w, h = img.size
    pix = img.load()

    # Remove fundo escuro (opaco) e pinta o ícone de laranja com fundo transparente.
    # Estratégia:
    # - pixels muito escuros -> alpha 0
    # - restante -> cor laranja, mantendo alpha original
    for y in range(h):
        for x in range(w):
            r, g, b, a = pix[x, y]
            # Qualquer pixel bem escuro vira transparente (o PNG original tem fundo escuro).
            if (r + g + b) / 3 < 60:
                pix[x, y] = (0, 0, 0, 0)
            else:
                pix[x, y] = (orange[0], orange[1], orange[2], a)

    img.save(src)
    print(f"OK: sobrescreveu {src} ({w}x{h})")


if __name__ == "__main__":
    main()

