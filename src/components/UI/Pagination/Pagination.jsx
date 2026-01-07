import PropTypes from "prop-types";
import { usePagination, DOTS } from "./usePagination";

export const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li disabled={currentPage === 1} onClick={onPrevious}>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-indigo-200 focus:text-slate-800"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`dot${index}`}>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-indigo-200 focus:text-slate-800"
                >
                  ...
                </a>
              </li>
            );
          }

          return (
            <li onClick={() => onPageChange(pageNumber)} key={`page${index}`}>
              <a
                href="#"
                aria-current="page"
                className={`z-10 flex items-center justify-center px-4 h-10 leading-tight ${pageNumber === currentPage
                  ? "text-indigo-600 border border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 focus:ring-2 focus:ring-indigo-900 focus:bg-indigo-200 focus:text-slate-800"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-indigo-200 focus:text-slate-800"
                  }`}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}

        <li onClick={onNext} disabled={currentPage === lastPage}>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-indigo-200 focus:text-slate-800"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

// -------------------- PropTypes --------------------
Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,    // Callback when page changes
  totalCount: PropTypes.number.isRequired,   // Total number of items
  siblingCount: PropTypes.number,            // Optional, default = 1
  currentPage: PropTypes.number.isRequired,  // Current page number
  pageSize: PropTypes.number.isRequired,     // Number of items per page
};
