import { editUserInfoApi } from '../../../Apis/postApi';

function UserPatchBtn() {
  const editInfo = {
    github_url: 'https://github.com/Cwonseo',
  };

  const edit = () => {
    console.log(editInfo);

    editUserInfoApi(editInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return <button onClick={edit}>유저 정보 수정 기능</button>;
}

export default UserPatchBtn;
