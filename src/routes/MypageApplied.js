import { useEffect, useState } from 'react';
import styles from '../components/css/Maincss.module.css';
import Nav from '../components/js/Nav';
import { getMypageAppliedPost, getWriteApi } from '../Apis/postApi';
import PostingBox from '../components/js/posting/postingBox';
import Pagination from 'react-js-pagination';
import postStyle from './postStyle.module.css';
import styled from '@emotion/styled';

function MypageApplied() {
  const [page, setPage] = useState(1);
  const [post, setPost] = useState([]);
  const [totalElements, setTotalElements] = useState();
  const handlePageChange = (e) => {
    setPage(e);
  };
  useEffect(() => {
    console.log('hi');
    getMypageAppliedPost(page)
      .then((res) => {
        setTotalElements(res.data.totalElements);
        setPost(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Nav />

      <div className={styles.background_image} style={{ paddingTop: '100px' }}>
        <div style={{ margin: '0 auto', width: '1000px' }}>
          <Title>지원한 글</Title>
          {post != []
            ? post.map((e) => {
                return <PostingBox param={e} />;
              })
            : ''}
          {post == '' ? <No>지원한 글이 존재하지 않습니다.</No> : ''}
        </div>
        <div className={postStyle.pagination}>
          <Pagination
            activePage={page}
            prevPageText={'<'}
            nextPageText={'>'}
            totalItemsCount={totalElements}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            itemsCountPerPage={12}
            hideFirstLastPages
          />
        </div>
      </div>
    </div>
  );
}

export default MypageApplied;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
`;
export const No = styled.div`
  margin-top: 60px;
  color: var(--BG1, #fafafa);
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
`;
