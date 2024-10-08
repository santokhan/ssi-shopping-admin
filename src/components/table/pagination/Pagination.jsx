import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ totalPages, currentPage = 1 }) => {
  return (
    <div className="w-full flex justify-center">
      <ul className="flex gap-1 font-medium">
        {currentPage > 1 && (
          <li>
            <Link
              to={`?page=${parseInt(currentPage - 1)}`}
              className="p-2 min-w-12 min-h-12 flex-grow flex justify-center items-center leading-tight text-gray-500 bg-white hover:bg-dark-blue-500 hover:text-white shadow-lg rounded-full hover:text-gray-700"
            >
              <ArrowLeft2 className="w-4 h-4" />
            </Link>
          </li>
        )}
        {totalPages?.map((n, i) => (
          <li key={i}>
            <Link
              to={`?page=${parseInt(n)}`}
              className={`p-2 min-w-12 min-h-12 flex-grow min-leading-tight rounded-full hover:bg-dark-blue-500 hover:text-white flex justify-center items-center ${
                currentPage == n
                  ? 'bg-dark-blue-500 text-white'
                  : 'text-gray-600'
              }`}
            >
              {n}
            </Link>
          </li>
        ))}
        {currentPage < totalPages.length && (
          <li>
            <Link
              to={`?page=${parseInt(currentPage) + 1}`}
              className="p-2 min-w-12 min-h-12 flex-grow flex justify-center items-center leading-tight text-gray-500 bg-white hover:bg-dark-blue-500 hover:text-white shadow-lg rounded-full"
            >
              <ArrowRight2 className="w-4 h-4" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
