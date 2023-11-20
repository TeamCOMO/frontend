import React, { useState } from "react";
import Nav from "../components/js/Nav";
import axios from "axios";
import postStyle from "./postStyle.module.css";
import css from "./paging.css";
import Pagination from "react-js-pagination";

function Heart_p() {
  const [id, postId] = useState("");
  const [pw, setPw] = useState("");
  const API = process.env.REACT_APP_SERVER_URL;

  const [heartCount, setHeartCount] = useState(0); // 하트 수 저장하는 상태

  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleHeartClick = () => {
    axios
      .post(`${API}/api/v1/post/heart/1`, { username: id, password: pw })
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data);
        setHeartCount(heartCount + 1);
        console.log("하트증가성공:", res.data);
      })
      .catch((error) => {
        console.error("하트 클릭에 실패했습니다:", error);
      });
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <div className={postStyle.totalPostingBox}>
        <h3 style={{ margin: "40px 0 0 60px" }}>POSTING</h3>
        <div className={postStyle.postingBoxWrap}>
          <div className={postStyle.potingBox}>
            BOX
            {/* 하트 버튼을 추가하고 클릭할 때마다 하트 수가 증가하도록 설정 */}
            <button onClick={handleHeartClick}>❤️</button>
            <span className={postStyle.heartCount}>{heartCount}</span>
          </div>
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

export default Heart_p;
