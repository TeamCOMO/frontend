import { useEffect, useState } from 'react';
import styles from '../components/css/Maincss.module.css';
import Nav from '../components/js/Nav';
import { getWriteApi } from '../Apis/postApi';
import PostingBox from '../components/js/posting/postingBox';
import Pagination from 'react-js-pagination';
import postStyle from './postStyle.module.css';

function MypageWrite() {
  const [page, setPage] = useState(1);
  const [post, setPost] = useState();
  const [totalElements, setTotalElements] = useState();
  const handlePageChange = (e) => {
    setPage(e);
  };
  useEffect(() => {
    getWriteApi(page)
      .then((res) => {
        setTotalElements(res.data.totalElements);
        setPost(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  console.log(post);

  return (
    <div>
      <Nav />
      <div className={styles.background_image} style={{ paddingTop: '100px' }}>
        <div style={{ margin: '0 auto', width: '1000px' }}>
          {post != undefined
            ? post.map((e) => {
                return <PostingBox param={e} />;
              })
            : ''}
        </div>
        <div className={postStyle.pagination}>
          <Pagination
            activePage={page}
            prevPageText={'<'}
            nextPageText={'>'}
            totalItemsCount={totalElements}
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

export default MypageWrite;
