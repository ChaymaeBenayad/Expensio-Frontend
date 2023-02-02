import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const Pagination = (props) => {
  const pageCount = Math.ceil(props.totalExpenses / props.expensesPerPage);

  const changePage = ({ selected }) => {
    props.setCurrentPage(selected);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">>"
      onPageChange={changePage}
      pageCount={pageCount}
      previousLabel="<<"
      containerClassName={"paginationBttns"}
      previousLinkClassName={"previousBttn"}
      nextLinkClassName={"nextBttn"}
      disabledClassName={"paginationDisabled"}
      activeClassName={"paginationActive"}
    />
  );
};

export default Pagination;
