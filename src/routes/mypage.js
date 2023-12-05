import Nav from '../components/js/Nav';
import UserPatchBtn from '../components/js/mypage/UserPatchBtn';
import styles from '../components/css/Maincss.module.css';
import styled from '@emotion/styled';
import { Buffer } from 'buffer';
import github from '../components/img/gihubImg.svg';
import velog from '../components/img/velogImg.svg';
import { Link, useNavigate } from 'react-router-dom';
import { getMypageInfo } from '../Apis/postApi';
import { useEffect, useState } from 'react';

function Mypage() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    getMypageInfo()
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(info);
  return (
    <div>
      <Nav />
      <div className={styles.background_image} style={{ paddingTop: '100px' }}>
        <Box>
          <div style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '30px' }}>
                  {info.nickname}
                </div>
                <Info>{info.email}</Info>
              </div>
              <div>
                {info.github_url == '' ? (
                  ''
                ) : (
                  <Link to={info.github_url}>
                    <img src={github}></img>
                  </Link>
                )}

                {info.blog_url == '' ? (
                  ''
                ) : (
                  <img style={{ marginLeft: '20px' }} src={velog}></img>
                )}
              </div>
              <UserPatchBtn info={info} />
            </div>

            <Link to='/mypage/write' style={{ textDecoration: 'none' }}>
              <MiniBox>내가 쓴 글</MiniBox>
            </Link>
            <Link to='/mypage/comment' style={{ textDecoration: 'none' }}>
              <MiniBox>댓글 단 게시물</MiniBox>
            </Link>
            <Link to='/mypage/applied' style={{ textDecoration: 'none' }}>
              <MiniBox>지원한 글</MiniBox>
            </Link>
          </div>
        </Box>
      </div>
    </div>
  );
}
export default Mypage;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  width: 600px;
  height: 400px;
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
