import { useParams } from 'react-router-dom/dist';
import NavStyle from '../css/Nav.module.css';
import comoLogo from '../img/background.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Nav() {
  const navigate = useNavigate();
  const param = useParams();
  let accessToken = localStorage.accessToken;
  const handleLogout = () => {
    localStorage.setItem('accessToken', '');
    accessToken = '';
    navigate('/signin');
  };
  return (
    <div className={NavStyle.wrap}>
      <Link to="/" className={NavStyle.link}>
        <div style={{ margin: '0 20px 0 20px' }}>
          <flex style={{ color: 'black' }} className={NavStyle.logo}>
            C
          </flex>
          <flex className={NavStyle.logo}>O</flex>
          <flex style={{ color: 'black' }} className={NavStyle.logo}>
            M
          </flex>
          <flex className={NavStyle.logo}>O</flex>
        </div>
      </Link>
      <div className={NavStyle.menuBox}>
        <Link to="/post" style={{ textDecoration: 'none' }}>
          <flex className={NavStyle.menu}>Post</flex>
        </Link>
      </div>

      {accessToken === '' ? (
        <div className={NavStyle.loginBox}>
          <Link to="/signin">
            <button className={NavStyle.login}>Log in</button>
          </Link>
          <Link to="/signup">
            <button className={NavStyle.signup}>Sign up</button>
          </Link>
        </div>
      ) : (
        <div className={NavStyle.loginBox}>
          <Link to="/mypage">
            <button className={NavStyle.login}>마이페이지</button>
          </Link>
          <button className={NavStyle.signup} onClick={handleLogout}>
            {' '}
            로그아웃{' '}
          </button>
        </div>
      )}
    </div>
  );
}
export default Nav;
