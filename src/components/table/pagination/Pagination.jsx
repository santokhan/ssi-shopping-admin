import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';

// Array containing page numbers
export const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Pagination = (props) => {
    const { onNext, onBack, onChange, totalPages, currentPage = 1, className = '' } = props;

    return (
        <div className="w-full flex justify-center">
            <ul className="flex gap-1 font-medium">
                <li>
                    <button
                        type="button"
                        onClick={onBack}
                        className="p-2 min-w-12 min-h-12 flex-grow flex justify-center items-center leading-tight text-gray-500 bg-white shadow rounded-full hover:text-gray-700"
                    >
                        <ArrowLeft2 className='w-4 h-4' />
                    </button>
                </li>
                {totalPages.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            type="button"
                            onClick={() => onChange(pageNumber)}
                            className={`p-2 min-w-12 min-h-12 flex-grow min-leading-tight rounded-full hover:bg-gray-100 hover:text-gray-700 ${currentPage === pageNumber ? 'bg-dark-blue-500 text-white' : 'text-gray-600'}`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        type="button"
                        onClick={onNext}
                        className="p-2 min-w-12 min-h-12 flex-grow flex justify-center items-center leading-tight text-gray-500 bg-white shadow rounded-full hover:text-gray-700"
                    >
                        <ArrowRight2 className='w-4 h-4' />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;