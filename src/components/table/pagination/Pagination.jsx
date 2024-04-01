import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';

// Array containing page numbers
export const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Pagination = (props) => {
    const { onNext, onBack, onChange, totalPages, currentPage = 1, className = '' } = props;

    return (
        <div className="w-full flex justify-center">
            <ul className="flex -space-x-px">
                <li>
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 h-full"
                    >
                        <ArrowLeft2 className='w-4 h-4' />
                    </button>
                </li>
                {totalPages.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            type="button"
                            onClick={() => onChange(pageNumber)}
                            className={`px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === pageNumber ? 'bg-dark-blue-500 text-white' : 'text-gray-500'}`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        type="button"
                        onClick={onNext}
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 h-full"
                    >
                        <ArrowRight2 className='w-4 h-4' />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;