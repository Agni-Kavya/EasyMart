import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
 
const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState();
 
  let [searchParams] = useSearchParams();
  
 
  const page = Number(searchParams.get("page")) || 1;
 
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
 
  const setCurrentPageNo = () => {};
 
  return (
    <div className="d-flex justify-content-center my-5">
      {filteredProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
};
 
export default CustomPagination;