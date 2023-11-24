import { useState, useEffect } from 'react';
import Nav from '../components/js/Nav';
import postStyle from './postStyle.module.css';
import css from './paging.css';
import PostingBtn from '../components/js/posting/PostingBtn';
import Pagination from 'react-js-pagination';
import PostingBox from '../components/js/posting/postingBox';
import axios from 'axios';
import { viewPostApi } from '../Apis/postApi';
import CategoryBtn from '../components/js/posting/CategoryBtn';
import { postState } from '../recoils/Recoil';
import { useRecoilValue, useSetRecoilState } from 'recoil';
function Post() {
  const API = process.env.REACT_APP_API_KEY;
  const token = localStorage.accessToken;
  const setPostState = useSetRecoilState(postState);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const handlePageChange = (page) => {
    setPage(page);
  };

  console.log(useRecoilValue(postState));

  useEffect(() => {
    axios
      .get(`${API}/api/v1/post`, {
        params: { page },
        category: { category },
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data.posts);
        setPostState(res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Nav />
      <div className={postStyle.background} style={{ height: '150vh' }}>
        <div
          className={postStyle.totalPostingBox}
          style={{ paddingTop: '30px' }}
        >
          <PostingBtn param="post" />
          <h3 style={{ margin: '0 0 0 60px' }}>POSTING</h3>
          <div className={postStyle.postingBoxWrap}>
            <CategoryBtn />
            {useRecoilValue(postState).map((e) => {
              console.log(e);
              return <PostingBox param={e} />;
            })}
          </div>
          <div className={postStyle.pagination}>
            <Pagination
              activePage={page}
              prevPageText={'<'}
              nextPageText={'>'}
              totalItemsCount={100}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
              itemsCountPerPage={16}
              hideFirstLastPages
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
