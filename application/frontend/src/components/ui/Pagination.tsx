interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPages = [1, 2];
      const endPages = [totalPages - 1, totalPages];
      const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
        (p) => p > 2 && p < totalPages - 1
      );

      const allPages = [...startPages, ...middlePages, ...endPages];
      let last = 0;

      for (const page of allPages) {
        if (page - last > 1) pages.push('...');
        pages.push(page);
        last = page;
      }
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center items-center mt-6 gap-1">
      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 text-sm rounded-lg transition cursor-pointer ${
              currentPage === p
                ? 'bg-[#EC6724] text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="px-2 text-gray-400">
            {p}
          </span>
        )
      )}
    </div>
  );
}
