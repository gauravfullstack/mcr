type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div
      style={{
        marginTop: '12px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span>
        {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={
          currentPage === totalPages
        }
      >
        Next
      </button>
    </div>
  );
}