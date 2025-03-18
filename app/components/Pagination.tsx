"use client"
import { chevronLeft, chevronRight } from '@/lib/constants';
import React from 'react';

type Props = {
  totalPages: number;
  currentPage: number;
  updatePage: (page: number) => void;
};

const Pagination = (props: Props) => {

  const renderPagination = () => {
    var paginationArray = [];
    for (var i = 0; i < (props.totalPages); i++) {
      const num = i + 1;
      const isCurrentPage = props.currentPage === num;
      const inactiveStyle = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
      const activeStyle = "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
      paginationArray.push(
        <li key={i} onClick={() => props.updatePage(num)}>
          <div aria-current={true} className={isCurrentPage ? activeStyle : inactiveStyle}>
            <div>{i + 1}</div>
          </div>
        </li>
      )
    }
    return paginationArray;
  }

  return (
    <ul className="flex items-right justify-items-right -space-x-px h-8 text-sm">
      <li>
        <div onClick={() => props.updatePage(props.currentPage - 1)} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span className="sr-only">Previous</span>
          {chevronLeft}
        </div>
      </li>
      {renderPagination()}
      <li>
        <div onClick={() => props.updatePage(props.currentPage + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span className="sr-only">Next</span>
          {chevronRight}
        </div>
      </li>
    </ul>
  )
}

export default Pagination;
