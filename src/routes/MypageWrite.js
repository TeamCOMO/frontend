import styles from '../components/css/Maincss.module.css';
import Nav from '../components/js/Nav';

function MypageWrite() {
  return (
    <div>
      <Nav />
      <div
        className={styles.background_image}
        style={{ paddingTop: '100px' }}
      ></div>
    </div>
  );
}

export default MypageWrite;
