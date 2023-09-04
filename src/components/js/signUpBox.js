import React, { useState, useEffect } from "react";
import styles from "../css/signUp.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUpBox = () => {
  const navigate = useNavigate();
  const [allAgreed, setAllAgreed] = useState(false);
  const [lecoAgreed, setLecoAgreed] = useState(false);
  const [infoAgreed, setInfoAgreed] = useState(false);
  const [eventAgreed, setEventAgreed] = useState(false);
  const [page, setPage] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [passwordChecking, setPasswordChecking] = useState(false);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCheckedPasswordChange = (e) => {
    setCheckedPassword(e.target.value);
    console.log(password, checkedPassword);
  };
  const handleIdChange = (e) => {
    setNickname(e.target.value);
  };
  const handleEmailChange = (e) => {
    console.log(e);
    setEmail(e.target.value);
  };
  const signUpInfo = [nickname, username, password, email];
  useEffect(() => {
    console.log(password, checkedPassword, passwordChecking);
    if (checkedPassword === password) {
      setPasswordChecking(true);
    } else {
      setPasswordChecking(false);
    }
  }, [checkedPassword, password]);

  const handlePage = () => {
    let isEmpty = false;
    const pattern1 = /[0-9]/; // 숫자
    const pattern2 = /[a-zA-Z]/; // 문자
    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자

    signUpInfo.map((prop) => {
      if (prop === "") {
        isEmpty = true;
      }
    });
    if (isEmpty == true) {
      alert("정보를 모두 기입해주세요.");
    } else if (
      nickname.length < 2 ||
      !pattern1.test(password) ||
      !pattern2.test(password) ||
      !pattern3.test(password)
    ) {
      alert("올바른 형식의 정보를 입력해주세요.");
    } else {
      setPage(!page);
    }
  };
  const handlePageBack = () => {
    setPage(!page);
    setCheckedPassword("");
  };
  const handleAllAgreedChange = (e) => {
    setAllAgreed(e.target.checked);
    setLecoAgreed(e.target.checked);
    setInfoAgreed(e.target.checked);
    setEventAgreed(e.target.checked);
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
    console.log(password, checkedPassword, passwordChecking);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `http://ec2-3-35-3-165.ap-northeast-2.compute.amazonaws.com/user/sign-up`,
        {
          username: nickname,
          password: password,
          checkedPassword: checkedPassword,
          nickname: username,
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
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.err);
        setPage(!page);
      });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.background}>
        <div className={styles.setForm}>
          {page === true ? (
            <div>
              <div className={styles.titleBox}>
                <h3 className={styles.title}>COMO 회원가입 1/2</h3>
              </div>
              <form className={styles.inputForm}>
                <div className={styles.inputName}>이름</div>
                <input
                  value={username}
                  onChange={handleUsernameChange}
                  name="name"
                  placeholder="이름(두글자 이상)"
                  className={styles.inputs}
                />
                <div className={styles.inputName}>아이디 ID</div>
                <input
                  value={nickname}
                  onChange={handleIdChange}
                  name="id"
                  placeholder="아이디"
                  className={styles.inputs}
                />
                <div className={styles.inputName}>비밀번호 Password</div>
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  name="pw"
                  type="password"
                  placeholder="비밀번호(8자리 이상, 1개 이상의 알파벳, 숫자, 특수문자 포함)"
                  className={styles.inputs}
                />
                <div className={styles.inputName}>
                  비밀번호 확인 Password Check
                </div>

                <input
                  onChange={handleCheckedPasswordChange}
                  name="pw"
                  type="password"
                  placeholder="비밀번호 확인"
                  className={styles.inputs}
                />
                {checkedPassword === "" ? (
                  ""
                ) : passwordChecking === false ? (
                  <div style={{ color: "red" }}>비밀번호가 다릅니다.</div>
                ) : (
                  <div style={{ color: "blue" }}>비밀번호가 일치합니다.</div>
                )}

                <div className={styles.inputName}>
                  <span>이메일</span>{" "}
                </div>
                <input
                  value={email}
                  onChange={handleEmailChange}
                  className={styles.inputs}
                  name="id"
                  placeholder="이메일"
                />
              </form>
            </div>
          ) : (
            <div>
              <button
                style={{
                  position: "absolute",
                  marginTop: "20px",
                  marginLeft: "10px",
                  fontSize: "40px",
                }}
                onClick={handlePageBack}
              >
                {"<"}
              </button>
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
                      <span className={styles.color}> [필수]</span> 개인정보
                      수집 및 이용
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
            </div>
          )}

          <div className={styles.btnBox}>
            {page === true ? (
              <button className={styles.btn} onClick={handlePage}>
                다음
              </button>
            ) : (
              <button onClick={handleSubmit} className={styles.btn}>
                회원가입하기
              </button>
            )}
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
};

export default SignUpBox;
