import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../css/signIn.module.css";
import { useNavigate } from "react-router-dom";

function SignInBox() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const API_URL = process.env.REACT_APP_SERVER_URL;

  const signInClick = () => {
    axios.defaults.baseURL = API_URL; // const AccessToken = "";
    axios
      .post("/user/sign-in", { username: id, password: pw })
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data);
        console.log("로그인 성공:", res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.detail); // 로그인 실패 시 처리 (예: 에러 메시지 표시)
      });
  };

  const LoginFn = (e) => {
    e.preventDefault();
  };
  const onChangeId = (text) => {
    setId(text.target.value);
  };
  const onChangePw = (text) => {
    setPw(text.target.value);
  };
  console.log("change ID");
  console.log("change Pw");

  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.background}>
          <div>
            <h3 className={styles.title}>Log in</h3>
            <form className={styles.form} onSubmit={LoginFn}>
              <input
                onChange={onChangeId}
                className={styles.inputs}
                value={id}
                id="id"
                type="text"
                placeholder="아이디"
              />
              <br />
              <input
                onChange={onChangePw}
                className={styles.inputs}
                value={pw}
                id="password"
                type="password"
                visible="false"
                placeholder="비밀번호"
              />
              <br />
              <div className={styles.checkbox}>
                <input type="checkbox" />
                <span className={styles.maintain}>로그인 상태 유지</span>
                <a className={styles.find} href="#">
                  아이디 / 비밀번호 찾기
                </a>
              </div>
              <button
                className={styles.btn}
                type="submit"
                onClick={signInClick}
              >
                로그인하기
              </button>

              <div className={styles.signUp}>
                <span>처음 방문하셨나요? </span>
                <Link to="/signup" className={styles.signUpText}>
                  회원가입 하기
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInBox;
