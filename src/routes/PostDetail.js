import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePostApi, getPostApi } from '../Apis/postApi';
import { useEffect, useState } from 'react';
import postStyle from './postStyle.module.css';
import Nav from '../components/js/Nav';
import ApplyBtn from '../components/js/Apply/ApplyBtn';
import styled from '@emotion/styled';
import { WritingDate } from '../components/js/posting/postingBox';

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
      <Background className={postStyle.background}>
        <div className={postStyle.totalPostingBox}>
          <PostContatiner>
            <PostDetailContainer>
              <Title>{postInfo.title}</Title>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>글 작성한 사람</div>
                <WritingDate style={{ marginLeft: '40px' }}>
                  작성일 {postInfo.createdDate}
                </WritingDate>
                <div style={{ marginLeft: 'auto' }}>
                  <Link to={`/editpost/${postingId}`}>
                    <button>수정하기</button>
                  </Link>
                  <button onClick={handleDeletePost}>삭제하기</button>
                  <button>지원현황</button>
                  <ApplyBtn postId={postingId}></ApplyBtn>
                </div>
              </div>
              <Line />
              <div style={{ marginTop: '30px' }}>
                <img style={{ width: '100px' }} src={postInfo.images}></img>
              </div>
              <Body>{postInfo.body}</Body>

              <div>
                <span>카테고리 : </span>
                <span>{postInfo.category}</span>
              </div>
              <div>
                <span>기술스택 : </span>
                <span>{postInfo.techs}</span>
              </div>
              <Line />
            </PostDetailContainer>
          </PostContatiner>
        </div>
      </Background>
    </div>
  );
}
export default PostDetail;
const PostContatiner = styled.div`
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
`;
const PostDetailContainer = styled.div`
  width: 850px;
  height: 100vh;
  margin: 0 auto;
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;

  position: flex;
  position: relative;
`;
const Title = styled.div`
  display: flex;
  width: 815px;
  height: 65.859px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #000;
  font-family: Big Shoulders Display;
  font-size: 40px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
const Line = styled.div`
  width: 850px;
  height: 3px;
  background: #e3e3e3;
`;
const Body = styled.div`
  display: flex;
  margin-top: 40px;
  width: 850px;
  height: 400px;

  flex-shrink: 0;
  color: #000;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
`;
