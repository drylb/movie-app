import React from 'react';
import { PaginationProps } from '../types/types';

const Pagination: React.FC<PaginationProps> = ({
  handlePreviousInternalPage,
  handleNextInternalPage,
  prevButtonDisabled,
  nextButtonDisabled,
  totalPages,
  currentPage,
  internalPage,
}) => {
  const calcInternalCurrentPage = () => {
    if (internalPage === 1) {
      return currentPage * 2 - 1;
    } else if (internalPage === 2) {
      return currentPage * 2;
    }
    return 1;
  };

  const internalTotalPages = totalPages * 2;
  const internalCurrentPage = calcInternalCurrentPage();

  return (
    <>
      <button onClick={handlePreviousInternalPage} disabled={prevButtonDisabled}>
        Previous
      </button>
      <span>{`${internalCurrentPage} out of ${internalTotalPages}`}</span>
      <button onClick={handleNextInternalPage} disabled={nextButtonDisabled}>
        Next
      </button>
    </>
  );
};

export default Pagination;
