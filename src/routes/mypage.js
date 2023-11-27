import Nav from '../components/js/Nav';
import UserPatchBtn from '../components/js/mypage/UserPatchBtn';
import styles from '../components/css/Maincss.module.css';
import styled from '@emotion/styled';
import { Buffer } from 'buffer';
import github from '../components/img/gihubImg.svg';
import velog from '../components/img/velogImg.svg';
import { Link } from 'react-router-dom';

function mypage() {
  // const token = localStorage.getItem('accessToken');
  // const base64Payload = token.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
  // const payload = Buffer.from(base64Payload, 'base64');
  // const info = JSON.parse(payload.toString());

  return (
    <div>
      <Nav />

      <div className={styles.background_image} style={{ paddingTop: '100px' }}>
        <Box>
          <div style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '30px' }}>
                  주영잉
                </div>
                <Info>dnjstj88@naver.com</Info>
              </div>
              <div>
                <img src={github}></img>

                <img style={{ marginLeft: '20px' }} src={velog}></img>
              </div>
              <UserPatchBtn />
            </div>

            <MiniBox>
              <div>아이디 </div>
              {/* <Info>{info.sub}</Info> */}
            </MiniBox>
            <Link to="/mypage/write" style={{ textDecoration: 'none' }}>
              <MiniBox>내가 쓴 글</MiniBox>
            </Link>
            <Link to="/mypage/write" style={{ textDecoration: 'none' }}>
              <MiniBox>내가 쓴 댓글 </MiniBox>
            </Link>
            <Link to="/mypage/write" style={{ textDecoration: 'none' }}>
              <MiniBox>내 모집글 신청 현황</MiniBox>
            </Link>
            <Link to="/mypage/write" style={{ textDecoration: 'none' }}>
              <MiniBox>지원한 글</MiniBox>
            </Link>
          </div>
        </Box>
      </div>
    </div>
  );
}
export default mypage;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  width: 600px;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  margin: 0 auto;
`;

const MiniBox = styled.div`
  display: flex;
  width: 350px;
  height: 50px;
  margin-top: 20px;
  padding: 0 20px 0 20px;
  border: 1px solid;
  border-radius: 20px;

  justify-content: space-between;
  align-items: center;

  color: black;
`;

const Info = styled.div`
  color: #a3a3a3;
`;
