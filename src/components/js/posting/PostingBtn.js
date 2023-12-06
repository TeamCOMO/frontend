import { Link } from 'react-router-dom';
import style from '../../../routes/postStyle.module.css';
import styled from '@emotion/styled';
function PostingBtn(param) {
  console.log(param.param);
  return (
    <div style={{ float: 'right' }}>
      {param.param === 'post' ? (
        <Link to="/posting" style={{ textDecoration: 'none', color: 'black' }}>
          <Posting>글쓰기</Posting>
        </Link>
      ) : (
        <Link to="/post" style={{ textDecoration: 'none', color: 'black' }}>
          <Posting>뒤로가기</Posting>
        </Link>
      )}
    </div>
  );
}

export default PostingBtn;

const Posting = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: 900;
  width: 100px;
`;
