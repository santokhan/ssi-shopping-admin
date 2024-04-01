import React from 'react';

const TableSummary = ({ dataPerPage, totalData, currentPage }) => {
    const startIndex = Math.min(dataPerPage * (currentPage - 1) + 1, totalData);
    const endIndex = Math.min(dataPerPage * currentPage, totalData);

    return (
        <div className='w-full flex justify-center'>
            {startIndex} – {endIndex} of {totalData} property available
        </div>
    );
};

export default TableSummary;
