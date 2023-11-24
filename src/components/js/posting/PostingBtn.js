import { Link } from 'react-router-dom';
import style from '../../../routes/postStyle.module.css';
function PostingBtn(param) {
  console.log(param.param);
  return (
    <div style={{ float: 'right' }}>
      {param.param === 'post' ? (
        <Link to="/posting" style={{ textDecoration: 'none', color: 'black' }}>
          <h3 className={style.postingBtn}>글쓰기</h3>
        </Link>
      ) : (
        <Link to="/post" style={{ textDecoration: 'none', color: 'black' }}>
          <h3 className={style.postingBtn}>뒤로가기</h3>
        </Link>
      )}
    </div>
  );
}

export default PostingBtn;
