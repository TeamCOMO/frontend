import { useEffect, useState } from 'react';
import { getApplyStatus } from '../Apis/postApi';
import styles from '../components/css/Maincss.module.css';
import Nav from '../components/js/Nav';
import { useParams } from 'react-router-dom';
import ApplyStatusBox from '../components/js/mypage/ApplyStatusBox';
import { No } from './MypageApplied';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

function MypageApplyStatus() {
  const postId = useParams(':postId').postId;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getApplyStatus(postId)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Nav />
      <div className={styles.background_image} style={{ paddingTop: '100px' }}>
        <BoxContainer>
          {users == '' ? (
            <No>아직 지원한 사람이 없습니다.</No>
          ) : (
            <Title>신청한 사람</Title>
          )}
          {users.map((e) => {
            return <ApplyStatusBox info={e} />;
          })}
        </BoxContainer>
      </div>
    </div>
  );
}

export default MypageApplyStatus;

const BoxContainer = styled.div`
  width: 1000px;
  padding-top: 170px;
  margin: 0 auto;
`;

const Title = styled.div`
  color: white;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
`;
