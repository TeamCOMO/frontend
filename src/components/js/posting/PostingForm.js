import { useEffect, useState } from 'react';
import style from './boxStyle.module.css';

import { useNavigate } from 'react-router-dom';
import { editPostApi, writePostApi } from '../../../Apis/postApi';
import styled from '@emotion/styled';
function PostingForm(param) {
  const navigate = useNavigate();
  let formData = new FormData();

  const [postInfo, setPostInfo] = useState({
    postId: '',
    title: '',
    body: '',
    category: 'Study',
    image: '',
  });
  const [techs, setTechs] = useState('React');
  const [tech, setTech] = useState([]);

  useEffect(() => {
    param.postType == 'editPost'
      ? setPostInfo(param.editPostInfo)
      : console.log('Not Edit');
  }, [param]);
  const handlePostInfo = (e) => {
    if (e.target.id === 'image') {
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
    if (tech.includes(techs)) {
      alert('이미 존재하는 스택입니다!');
      return;
    }
    setTech(tech.concat(techs));
    alert('추가됐습니다.');
  };
  const handleDelete = (delTech) => {
    const filteredTech = tech.filter((e) => {
      return !(e == delTech);
    });
    setTech(filteredTech);
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
    if (tech == '') alert('스택을 추가해주세요');
    else if (postInfo.title == '') alert('제목을 입력해주세요');
    else if (postInfo.body == '') alert('본문을 입력해주세요.');
    else
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
      <div style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Title
          value={postInfo.title}
          onChange={handlePostInfo}
          id="title"
          placeholder="제목"
        ></Title>
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handlePostInfo}
          id="image"
          style={{ marginTop: '30px' }}
        ></input>
        <hr></hr>
      </div>
      <div style={{ display: 'flex' }}>
        <textarea
          value={postInfo.body}
          onChange={handlePostInfo}
          id="body"
          placeholder="본문"
          className={style.textarea}
          style={{ width: '1000px', height: '400px' }}
        ></textarea>
        <div style={{ marginTop: '50px', marginLeft: '100px' }}>
          <div>카테고리</div>
          <Input
            value={postInfo.category}
            onChange={handlePostInfo}
            id="category"
            placeholder="카테고리"
          >
            <option value={'Study'}>스터디</option>
            <option value={'Project'}>프로젝트</option>
          </Input>
          <hr></hr>
          <div>스택 </div>
          <div style={{ display: 'flex' }}>
            <Input onChange={handleTech} id="techs" placeholder="기술스택">
              <option value={'React'}>React</option>
              <option value={'Spring'}>Spring</option>
            </Input>
            <button
              style={{ marginLeft: '20px', border: '0' }}
              onClick={onClickTehcs}
            >
              추가
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              background: '#fff',
              marginTop: '20px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {tech.map((e) => {
              return (
                <TechBox>
                  {e}{' '}
                  <Delete
                    onClick={() => handleDelete(e)}
                    style={{ marginLeft: '40px' }}
                  >
                    x
                  </Delete>
                </TechBox>
              );
            })}
          </div>

          <div style={{ marginTop: '60px', marginLeft: '100px' }}>
            {param.postType == 'editPost' ? (
              <button onClick={handleEditPosting}>수정하기</button>
            ) : (
              <button onClick={handlePosting}> 글쓰기 </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostingForm;
const Title = styled.input`
  width: 1000px;
  height: 40px;
  font-size: 30px;
  font-weight: 600;
  border: 0;
  margin-top: 20px;
`;
const Input = styled.select`
  width: 200px;
  height: 50px;
`;

const TechBox = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 30px;
  background-color: aliceblue;
`;
const Delete = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
