import styles from '../components/css/Maincss.module.css';
import Nav from '../components/js/Nav';
import PostingBox from '../components/js/posting/postingBox';

function MypageWrite() {
  return (
    <div>
      <Nav />
      <div
        className={styles.background_image}
        style={{ paddingTop: '100px' }}
      ></div>
      <PostingBox />
    </div>
  );
}

export default MypageWrite;
