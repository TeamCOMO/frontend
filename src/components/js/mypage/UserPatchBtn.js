import { useState } from 'react';
import { editUserInfoApi } from '../../../Apis/postApi';
import styled from '@emotion/styled';

function UserPatchBtn() {
  const [popup, setPopup] = useState(false);

  const [editInfo, setEditinfo] = useState({
    github_url: '',
    blog_url: '',
    nickname: '',
    password: '',
  });
  const handleClose = () => {
    setPopup(!popup);
    setEditinfo(null);
  };
  const handleEditInfo = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditinfo({ ...editInfo, [name]: value });
    console.log(editInfo);
  };

  const edit = () => {
    editUserInfoApi(editInfo)
      .then((res) => {
        console.log(res);
        localStorage.setItem('github_url', editInfo.github_url);
        setPopup(!popup);
        alert('수정이 완료되었습니다!');
      })
      .catch((err) => console.log(err));
  };
  const nickname = localStorage.getItem('info');

  return (
    <div>
      <button
        onClick={() => {
          setPopup(!popup);
        }}
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
              <InputBox name="blog_url" onChange={handleEditInfo} />
              <InputTitle>깃허브 URL</InputTitle>
              <InputBox
                onChange={handleEditInfo}
                name="github_url"
                placeholder="https://github.com/example"
              />
              <InputTitle>닉네임</InputTitle>
              <InputBox
                name="nickname"
                onChange={handleEditInfo}
                placeholder={nickname}
              />
              <InputTitle>비밀번호</InputTitle>
              <InputBox
                name="password"
                onChange={handleEditInfo}
                type="password"
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
