import React from "react";
import ReactPaginate from "react-paginate";

import "./Pagination.css";

const Pagination = ({ setSkip, limit, numberOfLinks }) => {
  const handlePageClick = (data) => {
    const displayed = data.selected;
    const skip = Math.ceil(displayed * limit);
    setSkip(skip);
  };

  return (
    <div className="paginationContainer">
      <ReactPaginate
        pageCount={numberOfLinks}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
