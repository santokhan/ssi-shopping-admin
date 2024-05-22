import React from 'react';

const TableSummary = ({ dataPerPage = 10, totalData = 0, currentPage = 1 }) => {
  const pageMin = (currentPage - 1) * dataPerPage;
  const pageMax = currentPage * dataPerPage;
  const pageLast = pageMax < totalData ? pageMax : totalData;

  return (
    <div className="w-full flex justify-center">
      {/* current page min - current page max of total length */}
      {pageMin} – {pageLast} of {totalData} available
    </div>
  );
};

export default TableSummary;
