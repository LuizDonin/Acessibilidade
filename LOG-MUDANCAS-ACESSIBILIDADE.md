# Acessibilidade do livro digital — o que existe, por quê, e como reutilizar

Este documento lista **apenas** o que foi **criado** ou **alterado** para o modo de acessibilidade, em termos gerais, e como **usar** o painel e **encaixar** a mesma ideia em um livro novo feito do zero.

---

## 1. Arquivos criados (núcleo da funcionalidade)

| Arquivo | Para que serve |
|---------|----------------|
| `src/types/accessibility.ts` | Tipos TypeScript das preferências (contraste, escala de fonte, fonte de corpo, negrito, régua, foco de leitura, etc.). |
| `src/constants/bookReadingTheme.ts` | Paletas (padrão e Modo 1), valores padrão e função que gera **variáveis CSS** (`--book-*`) a partir das preferências — é o “tema” do livro. |
| `src/utils/accessibilityStorage.ts` | Lê e grava `book_a11y_prefs` no `localStorage`, com merge seguro; regras extras (ex.: régua e foco não ficam os dois ativos). |
| `src/hooks/useAccessibilityPreferences.ts` | Estado React das preferências, estilo do root (`bookStyle`), ajustes de fonte, reset, persistência automática. |
| `src/components/accessibility/AccessibilitySidebar.tsx` | Painel lateral: contraste, fonte, tamanho, negrito, régua/foco, reset. |
| `src/components/accessibility/ReadingRuler.tsx` | Régua que acompanha o ponteiro. |
| `src/components/accessibility/ReadingFocus.tsx` | Faixa central iluminada (foco de leitura). |

**Por quê:** centralizar tema, persistência e UI em módulos próprios, sem espalhar lógica de contraste em cada parágrafo. O miolo só precisa **consumir** variáveis CSS e, onde necessário, receber `contrastMode` para exceções (ex.: botões com variante Modo 1).

---

## 2. Arquivos modificados (integração ao livro)

Alterações seguem sempre a mesma ideia: **herdar cor, fonte e tamanho do tema** e, quando o layout exige, **passar `contrastMode`** para componentes que têm variante visual explícita no Modo 1.

### Entrada e estilo global

| Arquivo | O que mudou, em geral |
|---------|------------------------|
| `index.html` | Fontes de corpo usadas no painel (ex.: Ubuntu, Atkinson); suporte ao miolo. |
| `tailwind.config.js` | Família `ubuntu` (e afins) amarrada a `var(--book-font-body)` para classes Tailwind acompanharem a fonte escolhida. |
| `src/index.css` | Classes `.book-reading-root`, `.book-reading-column`, capítulo, sumário, tabelas, questões, foco visível, highlights (`.book-inline-highlight`), ajustes específicos do Modo 1 (inputs, modal do professor, QR do sumário, etc.). |

### Orquestração

| Arquivo | O que mudou, em geral |
|---------|------------------------|
| `src/components/Book.tsx` | Usa o hook; aplica `style={bookStyle}` e `data-a11y-contrast-mode` no root; monta sidebar, régua e foco; repassa `contrastMode` onde preciso; conteúdo do miolo dentro da coluna que lê as variáveis CSS. |

### Miolo, navegação e blocos de conteúdo

Incluem, entre outros: `Chapter.tsx`, `Pagination.tsx`, `TableOfContents.tsx`, `CaixaTexto.tsx`, `TrilhaTexto.tsx`, `MinhaVersao.tsx`, `ProducaoTexto.tsx`, `ProducaoTextoNoticia.tsx`, `ProducaoTextoFabula.tsx`, `ProducaoFinal.tsx`, `Header.tsx`, `Footer.tsx`, `DataTable.tsx`, `ContinuaProximaPagina.tsx`.

**Por quê:** trocar cores e fontes fixas por `var(--book-…)` e tamanhos escaláveis (`--book-body-size`, `--book-h3-size`, etc.), para o painel controlar leitura em todo o livro.

### Professor, download, critérios

| Arquivo | O que mudou, em geral |
|---------|------------------------|
| `TeacherButton.tsx` | Variante Modo 1 no botão e **tema do modal** (fundo, borda, texto, tipografia acessível). |
| `DownloadButton.tsx` | Variante Modo 1; ícone decorativo sem poluir leitor de tela. |
| `CriteriosAvaliacao.tsx` | Cores/bordas do tema; ícones da tabela sem distorção; alinhamento do cabeçalho. |

### Questões e atividades

Incluem, entre outros: `QuestionAlternative.tsx`, `QuestionTextInput.tsx`, `QuestionTextInputWithEmbedded.tsx`, `QuestionTrueFalse.tsx`, `QuestionTableFill.tsx`, `DownloadQuestionsButton.tsx`, `shared/QuestionWrapper.tsx`.

**Por quê:** formulários e tabelas de questão usam as mesmas variáveis de borda, texto e fundo que o restante do livro, inclusive no Modo 1.

---

## 3. Como usar o modo de acessibilidade (quem confecciona ou testa o livro)

1. **Abrir o painel** pelo controle fixo na lateral direita da tela.
2. **Alto contraste:** escolher **Padrão do livro** ou **Modo 1** (único modo de alto contraste exposto no MVP).
3. **Fonte de corpo:** alternar entre Ubuntu e Atkinson.
4. **Baixa visão:** aumentar ou diminuir o tamanho da fonte (passos de 10%), ativar negrito no corpo, **Resetar tudo** para voltar aos padrões do tema.
5. **Ferramentas:** **Régua** ou **Foco de leitura** — apenas um de cada vez; ao ligar um, o outro desliga.
6. **Teclado:** **Esc** fecha o painel quando ele está aberto.

Preferências ficam salvas no navegador (`book_a11y_prefs`) até o usuário limpar dados do site ou usar outro aparelho/navegador.

---

## 4. Como implementar em um livro novo (do zero ou outro projeto)

Objetivo: qualquer página de “livro” deve **definir as variáveis CSS** no mesmo nó raiz e colocar o conteúdo numa coluna que use essas classes.

### Passos essenciais

1. **Copiar o núcleo de acessibilidade**  
   Tipos, `bookReadingTheme`, `accessibilityStorage`, `useAccessibilityPreferences`, `AccessibilitySidebar`, `ReadingRuler`, `ReadingFocus` (e imports no app).

2. **Envolver o conteúdo do livro** num elemento com:
   - `className` que inclua algo equivalente a `book-reading-root`;
   - `style={bookStyle}` vindo do hook;
   - `data-a11y-contrast-mode` com o valor atual (string), se você usar regras CSS que dependem dele (Modo 1, etc.).

3. **Coluna do miolo** com classe equivalente a `book-reading-column`, para `index.css` aplicar fundo e fonte de corpo.

4. **Montar o painel e as ferramentas** no mesmo layout que o `Book.tsx`: sidebar + régua + foco, lendo `prefs` do hook.

5. **Estilizar pelo tema, não por cor fixa**  
   - Corpo: `color: var(--book-text-body)`, `font-family: var(--book-font-body)`, `font-size: var(--book-body-size)`, etc.  
   - Títulos: `var(--book-font-heading)`, `var(--book-h3-size)` / `var(--book-h4-size)` / `var(--book-h2-size)` conforme o nível.  
   - Bordas e CTAs: `var(--book-interactive-accent)`, `var(--book-table-border)`, etc.  
   Consulte `buildBookReadingStyle` e `index.css` para a lista completa de variáveis.

6. **Onde o design muda de propósito no Modo 1** (ex.: botão com borda laranja), passe `contrastMode={prefs.contrastMode}` e trate `contrastMode === 1` no componente, como em `TeacherButton` ou `DownloadButton`.

7. **Formulários**  
   Use as mesmas variáveis para borda/cor de texto/fundo dos `input`/`textarea`, e regras de `:focus` compatíveis com o Modo 1 (ver `index.css`), para não quebrar contraste nem foco visível.

8. **Imagens**  
   Texto alternativo (`alt`) para conteúdo informativo; `alt=""` e `aria-hidden` para puramente decorativas; links que são só ícone precisam de `aria-label` compreensível.

9. **Highlights no texto**  
   Se usar classe tipo `book-inline-highlight`, o CSS já trata padrão (fundo) vs Modo 1 (sublinhado na cor do texto).

### Checklist rápido para um capítulo novo

- [ ] Texto e títulos usam variáveis `--book-*` (ou classes já mapeadas em `index.css`).  
- [ ] Nenhum bloco importante com cor de texto fixa que some no Modo 1.  
- [ ] Questões/campos alinhados ao tema.  
- [ ] Imagens com `alt` adequado.  
- [ ] Testar Padrão e Modo 1 + aumento de fonte após adicionar o bloco.

---

## 5. Persistência

- **Só acessibilidade:** chave `book_a11y_prefs`.  
- Outras chaves (respostas, scroll, textos de produção) são do próprio app de livro, não do painel — limpar “dados do livro” pode envolver várias chaves; o painel só controla `book_a11y_prefs`.

---

*Documento focado em criados/alterados por causa da acessibilidade, uso do painel e guia de implementação em livro novo.*
