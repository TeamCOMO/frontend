import { Link } from 'react-router-dom';
import style from '../../../routes/postStyle.module.css';
import styled from '@emotion/styled';
import { Category } from './CategoryBtn';
function PostingBtn(param) {
  console.log(param.param);
  return (
    <div style={{ marginLeft: 'auto' }}>
      {param.param === 'post' ? (
        <Link to="/posting" style={{ textDecoration: 'none', color: 'black' }}>
          <Category>글쓰기</Category>
        </Link>
      ) : (
        <Link to="/post" style={{ textDecoration: 'none', color: 'black' }}>
          <Category>뒤로가기</Category>
        </Link>
      )}
    </div>
  );
}

export default PostingBtn;
