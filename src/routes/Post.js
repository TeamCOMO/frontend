import { useState, useEffect } from "react";
import Nav from "../components/js/Nav";
import postStyle from "./postStyle.module.css";
import css from "./paging.css";
import PostingBtn from "../components/js/posting/PostingBtn";
import Pagination from "react-js-pagination";
import PostingBox from "../components/js/posting/postingBox";
import axios from "axios";
import { viewPostApi } from "../Apis/postApi";

function Post() {
  const API = process.env.REACT_APP_API_KEY;
  const token = localStorage.accessToken;
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    axios
      .get(`${API}/api/v1/posts`, {
        params: { page },
        category: { category },
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  console.log(posts);
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <div className={postStyle.totalPostingBox}>
        <PostingBtn param="post" />
        <h3 style={{ margin: "40px 0 0 60px" }}>POSTING</h3>
        <div className={postStyle.postingBoxWrap}>
          {posts.map((e) => {
            console.log(e);
            return <PostingBox param={e} />;
          })}
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
