import React from 'react';

const TableSummary = ({ dataPerPage = 10, totalData = 0, currentPage = 1 }) => {
  return (
    <div className="w-full flex justify-center">
      {1} – {totalData} of {dataPerPage} property available
    </div>
  );
};

export default TableSummary;
