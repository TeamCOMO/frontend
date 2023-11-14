import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePostApi, getPostApi } from '../Apis/postApi';
import { useEffect, useState } from 'react';
import postStyle from './postStyle.module.css';
import Nav from '../components/js/Nav';
import ApplyBtn from '../components/js/Apply/ApplyBtn';

function PostDetail() {
  const [postInfo, setPostInfo] = useState({});
  const token = localStorage.accessToken;
  const postingId = useParams().postId;
  const navigate = useNavigate();
  const handleDeletePost = () => {
    deletePostApi(postingId)
      .then((res) => {
        navigate('/post');
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  console.log(postInfo);
  useEffect(() => {
    getPostApi(postingId)
      .then((res) => {
        setPostInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className={postStyle.totalPostingBox}>
        <div>
          <img style={{ width: '100px' }} src={postInfo.images}></img>
        </div>
        <div>
          <span>제목 : </span>
          <span>{postInfo.title}</span>
        </div>
        <div>
          <span>내용 : </span>
          <span>{postInfo.body}</span>
        </div>

        <div>
          <span>카테고리 : </span>
          <span>{postInfo.category}</span>
        </div>

        <div>
          <span>기술스택 : </span>
          <span>{postInfo.techs}</span>
        </div>
        <Link to={`/editpost/${postingId}`}>
          <button>수정하기</button>
        </Link>
        <button onClick={handleDeletePost}>삭제하기</button>
        <ApplyBtn postId={postingId}></ApplyBtn>
      </div>
    </div>
  );
}
export default PostDetail;
