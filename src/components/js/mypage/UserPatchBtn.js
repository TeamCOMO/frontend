import { useEffect, useState } from 'react';
import { editUserInfoApi } from '../../../Apis/postApi';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

function UserPatchBtn(props) {
  const [popup, setPopup] = useState(false);
  console.log(props);
  const git = props.info.github_url;
  const blog = props.info.blog_url;
  const nickname = props.info.nickname;

  const [editInfo, setEditinfo] = useState({
    github_url: git,
    blog_url: blog,
    nickname: nickname,
    password: '',
  });
  useEffect(() => {
    console.log(editInfo);
    setEditinfo({
      github_url: git,
      blog_url: blog,
      nickname: nickname,
      password: '',
    });
  }, [props]);
  console.log(editInfo);
  const handleClose = () => {
    setPopup(!popup);
  };
  const handleEditInfo = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditinfo({ ...editInfo, [name]: value });
    console.log(editInfo);
  };

  const edit = () => {
    if (editInfo.password == '') {
      alert('비밀번호를 입력하세요!');
      return;
    } else if (editInfo.nickname.length >= 7) {
      alert('닉네임은 6글자를 넘을 수 없습니다.');
      return;
    }
    editUserInfoApi(editInfo)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem('github_url', editInfo.github_url);
        setPopup(!popup);

        alert('수정이 완료되었습니다!');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button
        onClick={() => {
          setPopup(!popup);
        }}
        style={{ background: 'black', color: '#fff', fontSize: '14px' }}
      >
        정보 수정
      </button>
      {popup ? (
        <PopupBackground>
          <PopupBox>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: '30px',
              }}
            >
              <h3 style={{ paddingTop: '20px', paddingLeft: '30px' }}>
                수정하기
              </h3>
              <Close onClick={handleClose} style={{ fontSize: '24px' }}>
                X
              </Close>
            </div>
            <div style={{ margin: '0 auto', width: '300px' }}>
              <InputTitle>블로그 URL</InputTitle>
              <InputBox
                name="blog_url"
                onChange={handleEditInfo}
                defaultValue={props.info.blog_url}
              />

              <InputTitle>깃허브 URL</InputTitle>
              <InputBox
                onChange={handleEditInfo}
                name="github_url"
                defaultValue={props.info.github_url}
              />
              <InputTitle>닉네임</InputTitle>
              <InputBox
                name="nickname"
                onChange={handleEditInfo}
                defaultValue={props.info.nickname}
              />
              <InputTitle>비밀번호</InputTitle>
              <InputBox
                name="password"
                onChange={handleEditInfo}
                type="password"
                defaultValue=""
              />
              <EditBtn onClick={edit}>수정 완료</EditBtn>
            </div>
          </PopupBox>
        </PopupBackground>
      ) : (
        ''
      )}
    </div>
  );
}

export default UserPatchBtn;

const PopupBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const PopupBox = styled.div`
  width: 500px;
  height: 600px;
  position: absolute;
  right: 36%;
  bottom: 15%;
  background-color: #fff;
  border-radius: 20px;
`;

const InputBox = styled.input`
  width: 300px;
  height: 40px;
  margin-top: 3px;
  font-size: 16px;
`;
const InputTitle = styled.div`
  margin-top: 10px;
`;
const EditBtn = styled.button`
  width: 300px;
  margin: 0 auto;
  border: 0;
  margin-top: 40px;
  background-color: #acc9cd;
  color: #fff;
`;

const Close = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
