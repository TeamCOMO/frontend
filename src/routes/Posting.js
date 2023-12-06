import Nav from '../components/js/Nav';
import postStyle from './postStyle.module.css';
import PostingBtn from '../components/js/posting/PostingBtn';
import PostingForm from '../components/js/posting/PostingForm';
import styles from '../components/css/Maincss.module.css';

function Posting() {
  return (
    <div>
      <Nav />

      <div className={styles.background_image} style={{ paddingTop: '20px' }}>
        <div className={postStyle.totalPostingBox}>
          <PostingBtn param="posintg" />

          <PostingForm />
        </div>
      </div>
    </div>
  );
}

export default Posting;
