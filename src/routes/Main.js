import Nav from '../components/js/Nav';
import styles from '../components/css/Maincss.module.css';
import Myslide from './Myslide';
function Main() {
  return (
    <div>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Lato&display=swap'
        rel='stylesheet'
      />
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
      />

      <script src='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'></script>
      <Nav />

      <div className={styles.background_image}>
        <div className={styles.explain}>
          <div>
            <h1
              class='animate__animated animate__fadeInDown'
              style={{ fontSize: '50px' }}
            >
              welcome to COMO
            </h1>
            <h2
              class='animate__animated animate__fadeInDown'
              style={{ fontSize: '30px' }}
            >
              <span>
                열정을 찾는 개발자들의 만남의 장, COMO에서 프로젝트의 동료를
                만나보세요!
              </span>
            </h2>
          </div>
        </div>
        <div class='animate__animated animate__fadeInLeftBig'>
          <Myslide></Myslide>
        </div>
      </div>
    </div>
  );
}

export default Main;
