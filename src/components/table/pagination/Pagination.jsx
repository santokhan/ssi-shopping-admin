import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';

// // Array containing page numbers
// export const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Pagination = ({
  totalPages,
  currentPage = 1,
  setPageNumber,
  isNextExist,
}) => {
  return (
    <div className="w-full flex justify-center">
      <ul className="flex gap-1 font-medium">
        {currentPage > 1 && (
          <li>
            <button
              type="button"
              onClick={() => {
                setPageNumber('prev');
              }}
              className="p-2 min-w-12 min-h-12 flex-grow flex justify-center items-center leading-tight text-gray-500 bg-white hover:bg-dark-blue-500 hover:text-white shadow-lg rounded-full hover:text-gray-700"
            >
              <ArrowLeft2 className="w-4 h-4" />
            </button>
          </li>
        )}
        {totalPages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              onClick={() => {
                setPageNumber(parseInt(pageNumber));
              }}
              className={`p-2 min-w-12 min-h-12 flex-grow min-leading-tight rounded-full hover:bg-dark-blue-500 hover:text-white ${
                currentPage === pageNumber
                  ? 'bg-dark-blue-500 text-white'
                  : 'text-gray-600'
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        {totalPages.length > 1 && (
          <li>
            <button
              type="button"
              onClick={() => {
                setPageNumber('next');
              }}
              className="p-2 min-w-12 min-h-12 flex-grow flex justify-center items-center leading-tight text-gray-500 bg-white hover:bg-dark-blue-500 hover:text-white shadow-lg rounded-full"
            >
              <ArrowRight2 className="w-4 h-4" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
