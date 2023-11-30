import Nav from "../components/js/Nav";
import styles from "../components/css/Maincss.module.css";
import Myslide from "./Myslide";

function Main() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      />

      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      <Nav />

      <div className={styles.background_image}>
        <h1 class="animate__animated animate__fadeInLeftBig">
          <div className={styles.explain}>
            <h1>welcome to COMO</h1>
            <span>This is some text.</span>
          </div>
          <Myslide></Myslide>
        </h1>
      </div>
    </div>
  );
}

export default Main;
