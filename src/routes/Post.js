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

import { useNavigationType } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function Post() {
  const history = createBrowserHistory();

  const API = process.env.REACT_APP_API_KEY;
  const token = sessionStorage.accessToken;
  const setPostState = useSetRecoilState(postState);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [totalElem, setTotalElem] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
    sessionStorage.setItem('page', page);
  };
  useEffect(() => {
    history.listen((e) => {
      console.log('안녕하세요');
      console.log(e.action);
      if (e.action == 'POP') setPage(parseInt(sessionStorage.getItem('page')));
      else {
        setPage(1);
        sessionStorage.setItem('page', 1);
      }
    });
  }, []);
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
        console.log(res);
        setTotalElem(res.data.totalElements);
        setPostState(res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Nav />

      <div className={postStyle.background} style={{ height: '1250px' }}>
        <div
          className={postStyle.totalPostingBox}
          style={{ paddingTop: '30px', width: '1500px' }}
        >
          <div className={postStyle.postingBoxWrap}>

            <CategoryBtn setPage={setPage} />


            {useRecoilValue(postState).map((e) => {
              return <PostingBox param={e} />;
            })}
          </div>

          <div className={postStyle.pagination}>
            <Pagination
              activePage={page}
              prevPageText={'<'}
              nextPageText={'>'}
              totalItemsCount={totalElem}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
              itemsCountPerPage={12}
              hideFirstLastPages
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
