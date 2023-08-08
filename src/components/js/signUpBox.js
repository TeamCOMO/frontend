import React, { useState, useEffect } from "react";
import styles from "../css/SignUp.module.css";
import axios from "axios";
import { API_URL } from "../Constant";
import { useNavigate, Link } from "react-router-dom";

const SignUpBox = () => {
  const [allAgreed, setAllAgreed] = useState(false);
  const [lecoAgreed, setLecoAgreed] = useState(false);
  const [infoAgreed, setInfoAgreed] = useState(false);
  const [eventAgreed, setEventAgreed] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const handleAllAgreedChange = (e) => {
    setAllAgreed(e.target.checked);
    setLecoAgreed(e.target.checked);
    setInfoAgreed(e.target.checked);
    setEventAgreed(e.target.checked);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCheckedPasswordChange = (e) => {
    setCheckedPassword(e.target.value);
  };
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post(
        `http://ec2-3-35-3-165.ap-northeast-2.compute.amazonaws.com/user/sign-up`,
        {
          username: username,
          password: password,
          checkedPassword: checkedPassword,
          nickname: nickname,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("회원가입 성공");
        navigate("/SignInBox");
      })
      .catch((error) => {
        console.log(error);
        alert("회원가입에 실패했습니다.");
      });
  };

  //console.log(allAgreed);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.setForm}>
            <div className={styles.titleBox}>
              <h3 className={styles.title}>COMO 회원가입</h3>
            </div>

            <form className={styles.inputForm}>
              <div className={styles.inputName}>아이디</div>
              <input
                onChange={handleUsernameChange}
                name="username"
                placeholder="아이디"
                className={styles.inputs}
              />
              <div className={styles.inputName}>비밀번호</div>
              <input
                onChange={handlePasswordChange}
                name="Password"
                placeholder="비밀번호"
                className={styles.inputs}
              />
              <div className={styles.inputName}>비밀번호 확인</div>
              <input
                onChange={handleCheckedPasswordChange}
                name="checkedPassword"
                type="checkedPassword"
                placeholder="비밀번호 확인"
                className={styles.inputs}
              />
              <div className={styles.inputName}>
                <span>닉네임</span>{" "}
              </div>
              <input
                onChange={handleNicknameChange}
                className={styles.inputs}
                name="nickname"
                placeholder="닉네임"
              />
              <div className={styles.inputName}>
                <span>이메일</span>{" "}
              </div>
              <input
                onChange={handleEmailChange}
                className={styles.inputs}
                name="email"
                placeholder="이메일"
              />
            </form>

            <ul className={styles.terms_list}>
              <li className={styles.check}>
                <div className={styles.terms_set}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={handleAllAgreedChange} // 이렇게 onChange 핸들러를 추가해주세요.
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
                    onChange={handleAllAgreedChange} // 이렇게 onChange 핸들러를 추가해주세요.
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
                    onChange={handleAllAgreedChange}
                    onClick={infoCheck}
                    checked={infoAgreed}
                  />
                  <span className={styles.checktext}>
                    <span className={styles.color}> [필수]</span> 개인정보 수집
                    및 이용
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
                    onChange={handleAllAgreedChange}
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
              <button
                style={{ width: "416px" }}
                type="submit"
                className="submit"
                onClick={handleRegister}
              >
                회원가입
              </button>
              <br />
              <div className={styles.backSignIn}>
                <Link to="/SignInBox" className={styles.backText}>
                  로그인 페이지로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpBox;
