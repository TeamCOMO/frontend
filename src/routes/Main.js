import Nav from "../components/js/Nav";
import styles from "../components/css/Maincss.module.css";

function Main() {
  return (
    <div>
      <Nav />
      <div className={styles.background_image}></div>
      <div className="main_introduce">
        <h1>welcome to COMO</h1>
        <span>This is some text.</span>
      </div>
    </div>
  );
}

export default Main;
