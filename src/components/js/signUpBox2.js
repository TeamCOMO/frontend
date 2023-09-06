import styles from "../css/signUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
const { useState, useEffect } = require("react");

function SignUpBox2() {
  const API_URL = process.env.REACT_APP_SERVER_URL;

  const [allAgreed, setAllAgreed] = useState(false);
  const [lecoAgreed, setLecoAgreed] = useState(false);
  const [infoAgreed, setInfoAgreed] = useState(false);
  const [eventAgreed, setEventAgreed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const allCheck = () => {
    if (allAgreed === false) {
      setAllAgreed(true);
      setLecoAgreed(true);
      setInfoAgreed(true);
      setEventAgreed(true);
    } else {
      setAllAgreed(false);
      setLecoAgreed(false);
      setInfoAgreed(false);
      setEventAgreed(false);
    }
  };
  const lecoCheck = () => {
    if (lecoAgreed === false) {
      setLecoAgreed(true);
    } else {
      setLecoAgreed(false);
    }
  };
  const infoCheck = () => {
    if (infoAgreed === false) {
      setInfoAgreed(true);
    } else {
      setInfoAgreed(false);
    }
  };
  const eventCheck = () => {
    if (eventAgreed === false) {
      setEventAgreed(true);
    } else {
      setEventAgreed(false);
    }
  };
  useEffect(() => {
    if (lecoAgreed === true && infoAgreed === true && eventAgreed === true)
      setAllAgreed(true);
    else setAllAgreed(false);
  }, [lecoAgreed, infoAgreed, eventAgreed]);
  const handleSubmit = () => {
    const userData = {
      username: id,
      password: password,
      checkedPassword: password,
      nickname: username,
      email: email,
    };
    axios
      .post(`${API_URL}/user/sign-up`, {
        userData,
      })
      .then((res) => {
        console.log("회원가입 성공", res.data);
      })
      .catch((error) => {
        console.log("회원가입 실패");
      });
  };
  console.log(allAgreed);

  return (
    <div className={styles.wrap}>
      <div className={styles.background}>
        <div className={styles.setForm}>
          <div className={styles.titleBox}>
            <h3 className={styles.title}>COMO 회원가입 2/2</h3>
          </div>

          <ul className={styles.terms_list}>
            <li className={styles.check}>
              <div className={styles.terms_set}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onClick={allCheck}
                  checked={allAgreed}
                />
                <span className={styles.checktext}> 전체 동의하기</span>
                <div className={styles.terms_box_all}>
                  <p>....</p>
                </div>
              </div>
            </li>
            <li className={styles.check}>
              <div className={styles.terms_set}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onClick={lecoCheck}
                  checked={lecoAgreed}
                />
                <span className={styles.checktext}>
                  <span className={styles.color}> [필수]</span> vvv 이용약관
                </span>
              </div>
              <div className={styles.terms_box}>
                <p>....</p>
              </div>
            </li>
            <li className={styles.check}>
              <div className={styles.terms_set}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onClick={infoCheck}
                  checked={infoAgreed}
                />
                <span className={styles.checktext}>
                  <span className={styles.color}> [필수]</span> 개인정보 수집 및
                  이용
                </span>
              </div>
              <div className={styles.terms_box}>
                <p>....</p>
              </div>
            </li>
            <li className={styles.check}>
              <div className={styles.terms_set}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onClick={eventCheck}
                  checked={eventAgreed}
                />
                <span className={styles.checktext}>
                  <span className={styles.color2}> [선택]</span>
                  이벤트 • 혜택 정보수신
                </span>
              </div>
              <div className={styles.terms_box}>
                <p>....</p>
              </div>
            </li>
          </ul>
          <div className={styles.btnBox}>
            <button onClick={handleSubmit} className={styles.btn}>
              회원가입하기
            </button>
            <br />
            <div className={styles.backSignIn}>
              <Link to="/signin" className={styles.backText}>
                로그인 페이지로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpBox2;
