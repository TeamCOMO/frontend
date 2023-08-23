import NavStyle from "../css/Nav.module.css";
import comoLogo from "../img/background.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Nav() {
  const navigate= useNavigate();
  let accessToken = localStorage.accessToken;
  const handleLogout = ()=>{
    localStorage.setItem("accessToken","")
    accessToken ="";
    navigate('')
  }
  return (
    <div className={NavStyle.wrap}>
      <Link to="/" className={NavStyle.link}>
        <img src={comoLogo} className={NavStyle.logo}></img>
      </Link>
      <div className={NavStyle.menuBox}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <flex className={NavStyle.menu}>Home</flex>
        </Link>
        <flex className={NavStyle.menu}>get post</flex>
        <flex className={NavStyle.menu}>event</flex>
        <flex className={NavStyle.menu}>My page</flex>
      </div>


      {accessToken === ""?
      <div className={NavStyle.loginBox}>
        <Link to="/signin">
          <button className={NavStyle.login}>Log in</button>
        </Link>
        <Link to="/signup">
          <button className={NavStyle.signup}>Sign up</button>
        </Link>
      </div>:
      <div>
      <span> 마이페이지 </span>
      <span className={NavStyle.logout} onClick={handleLogout}> 로그아웃 </span>
      </div>
  }
    </div>
  );
}
export default Nav;
