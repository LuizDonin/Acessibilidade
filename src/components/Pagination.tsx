interface PaginationProps {
  currentPage: number;
}

function Pagination({ currentPage }: PaginationProps) {
  return (
    <div
      data-page={currentPage}
      className="pagination-bar flex items-center justify-center -mx-8 md:-mx-12 px-4 md:px-[360px] py-1"
      style={{
        display: 'flex',
        width: '100vw',
        maxWidth: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'var(--pagination-bg, #F8B9CB)',
        color: 'var(--pagination-text, #000000)',
        marginBottom: '40px',
        marginTop: '40px',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        fontFamily: 'var(--book-font-body, Ubuntu, sans-serif)',
        fontSize: 'var(--book-body-size, 16px)',
      }}
    >
      <span>Página - {currentPage}</span>
      <svg
        className="h-3 w-3 shrink-0"
        viewBox="0 0 10 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M4.16666 0.857135C4.16666 0.383748 4.53977 0 5.00001 0C5.46024 4.61245e-06 5.83334 0.383751 5.83334 0.857135V9.07351L8.57741 6.25104C8.90284 5.9163 9.43048 5.91631 9.75592 6.25104C10.0814 6.58577 10.0814 7.12849 9.75592 7.46322L5.58927 11.749C5.26383 12.0837 4.73619 12.0837 4.41075 11.749L0.244074 7.46322L0.22906 7.44738C-0.0812765 7.11158 -0.0762761 6.58054 0.244074 6.25104C0.564425 5.92154 1.08071 5.91639 1.40719 6.23559L1.42259 6.25104L4.16666 9.07351V0.857135Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default Pagination;
