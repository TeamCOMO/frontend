import { useEffect, useState } from 'react';
import { getApplyStatus } from '../Apis/postApi';
import styles from '../components/css/Maincss.module.css';
import Nav from '../components/js/Nav';
import { useParams } from 'react-router-dom';
import ApplyStatusBox from '../components/js/mypage/ApplyStatusBox';
import { No } from './MypageApplied';

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
        {users == '' ? <No>아직 지원한 사람이 없습니다.</No> : ''}
        {users.map((e) => {
          return <ApplyStatusBox info={e} />;
        })}
      </div>
    </div>
  );
}

export default MypageApplyStatus;
