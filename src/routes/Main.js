import Nav from "../components/js/Nav";
import styles from "../components/css/Maincss.module.css";

function Main() {
  return (
    <div>
      <Nav />
      <div className={styles.background_image}>
        <div className={styles.main_introduce}>
          <h1>welcome to COMO</h1>
          <span>This is some text.</span>
        </div>
      </div>
    </div>
  );
}

export default Main;
