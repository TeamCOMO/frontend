import { useEffect, useState } from 'react';
import style from './boxStyle.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { editPostApi, writePostApi } from '../../../Apis/postApi';
function PostingForm(param) {
  const navigate = useNavigate();
  let formData = new FormData();

  const [postInfo, setPostInfo] = useState({
    postId: '',
    title: '',
    body: '',
    category: '',
    image: '',
  });
  const [techs, setTechs] = useState('');
  const [tech, setTech] = useState([]);

  useEffect(() => {
    param.postType == 'editPost'
      ? setPostInfo(param.editPostInfo)
      : console.log('Not Edit');
  }, [param]);
  const handlePostInfo = (e) => {
    if (e.target.id === 'image') {
      console.log(e, 'check');
      // 이미지 파일이 변경되었을 때 처리
      setPostInfo({
        ...postInfo,
        image: e.target.files[0], // 파일 객체를 저장
      });
    } else
      setPostInfo({
        ...postInfo,
        [e.target.id]: e.target.value,
      });
    console.log(postInfo, formData);
  };
  postInfo.postId = Number(postInfo.postId);
  const onClickTehcs = () => {
    setTech(tech.concat(techs));
    alert('추가됐습니다.');
  };
  const handleTech = (e) => {
    setTechs(e.target.value);
  };
  const handleEditPosting = () => {
    editPostApi(postInfo, tech)
      .then((res) => {
        console.log(res);
        navigate('/post');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePosting = () => {
    writePostApi(postInfo, tech)
      .then((res) => {
        console.log(res);
        alert('글 추가됨');
        navigate('/post');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePostInfo}
        id="image"
      ></input>
      <input
        value={postInfo.title}
        onChange={handlePostInfo}
        id="title"
        placeholder="제목"
      ></input>
      <textarea
        value={postInfo.body}
        onChange={handlePostInfo}
        id="body"
        placeholder="본문"
        className={style.textarea}
      ></textarea>
      <input
        value={postInfo.category}
        onChange={handlePostInfo}
        id="category"
        placeholder="카테고리"
      ></input>
      <input onChange={handleTech} id="techs" placeholder="기술스택"></input>
      <button onClick={onClickTehcs}>추가</button>
      {param.postType == 'editPost' ? (
        <button onClick={handleEditPosting}>수정하기</button>
      ) : (
        <button onClick={handlePosting}> 글쓰기 </button>
      )}
    </div>
  );
}

export default PostingForm;
