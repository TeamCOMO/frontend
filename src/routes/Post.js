import { useState } from "react";
import Nav from "../components/js/Nav";
import postStyle from "./postStyle.module.css";
import css from "./paging.css";
import Pagination from "react-js-pagination";
function Post() {
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <div className={postStyle.totalPostingBox}>
        <h3 style={{ margin: "40px 0 0 60px" }}>POSTING</h3>
        <div className={postStyle.postingBoxWrap}>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
          <div className={postStyle.potingBox}>BOX</div>
        </div>
        <div className={postStyle.pagination}>
          <Pagination
            activePage={page}
            prevPageText={"<"}
            nextPageText={">"}
            totalItemsCount={100}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            itemsCountPerPage={16}
            hideFirstLastPages
          />
        </div>
      </div>
    </div>
  );
}
export default Post;
