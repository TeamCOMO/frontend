import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../css/signIn.module.css";
import Nav from "./Nav";
function SignInBox() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const signInClick = () => {
    axios.defaults.baseURL =
      "http://ec2-3-35-3-165.ap-northeast-2.compute.amazonaws.com";
    const AccessToken = "";
    axios
      .post("/user/sign-in", { username: id, password: pw })
      .then((res) => {
        console.log("로그인 성공:", res);
        AccessToken = "";
      })
      .catch((error) => {
        console.log("잘못된 이메일 또는 비밀번호입니다."); // 로그인 실패 시 처리 (예: 에러 메시지 표시)
      });
  };

  const LoginFn = (e) => {
    e.preventDefault();
    console.log(id);
    console.log(pw);
    if (!id) {
      return alert("아이디를 입력하세요.");
    } else if (!pw) {
      return alert("비밀번호를 입력하세요");
    } else {
      //통신하는 부분
    }
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
      <Nav />
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
