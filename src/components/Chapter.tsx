import { ReactNode } from 'react';

interface ChapterProps {
  id: string;
  number: number;
  title: string;
  content: ReactNode;
}

function Chapter({
  id,
  number,
  title,
  content,
}: ChapterProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-4">
      <div className="chapter-heading-block border-l-[6px] pl-6 mb-6">
        <p className="chapter-label text-sm font-semibold tracking-wide mb-1">
          Capítulo {number}
        </p>
        <h2
          className="chapter-title-h2 text-4xl font-hwtArtz font-bold uppercase"
          style={{ lineHeight: '3.0rem' }}
        >
          {title}
        </h2>
      </div>
      <div className="chapter-content">{content}</div>
    </section>
  );
}

export default Chapter;
