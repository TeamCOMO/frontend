import styles from "../css/signUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
const { useState, useEffect } = require("react");

function SignUpBox() {
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
      .post(
        `ec2-3-35-3-165.ap-northeast-2.compute.amazonaws.com/user/sign-up`,
        {
          userData,
        }
      )
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
            <h3 className={styles.title}>COMO 회원가입 1/2</h3>
          </div>

          <form className={styles.inputForm}>
            <div className={styles.inputName}>이름</div>
            <input
              onChange={handleUsernameChange}
              name="name"
              placeholder="이름"
              className={styles.inputs}
            />
            <div className={styles.inputName}>아이디 ID</div>
            <input
              onChange={handleIdChange}
              name="id"
              placeholder="아이디"
              className={styles.inputs}
            />
            <div className={styles.inputName}>비밀번호 Password</div>
            <input
              onChange={handlePasswordChange}
              name="pw"
              type="password"
              placeholder="비밀번호"
              className={styles.inputs}
            />
            <div className={styles.inputName}>비밀번호 확인 Password Check</div>
            <input
              name="pw"
              type="password"
              placeholder="비밀번호 확인"
              className={styles.inputs}
            />
            <div className={styles.inputName}>
              <span>이메일</span>{" "}
            </div>
            <input
              onChange={handleEmailChange}
              className={styles.inputs}
              name="id"
              placeholder="이메일"
            />
          </form>

         
          <div className={styles.btnBox}>
        

          <button  className={styles.btn} onClick={handleSubmit}>다음</button>
              {/* <Link to ="/signup2" style={{textDecoration:"none", color:"white"}}>
              <button  className={styles.btn} onClick={handleSubmit}>다음</button></Link> */}
            
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

export default SignUpBox;
