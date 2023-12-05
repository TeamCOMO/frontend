import { useNavigate } from 'react-router-dom';
import { applyApi } from '../../../Apis/postApi';
import styled from '@emotion/styled';

function ApplyBtn(props) {
  const navigate = useNavigate();
  const apply = () => {
    applyApi(props.postId)
      .then((res) => {
        console.log(res);
        alert('신청되었습니다!');
        navigate('/mypage');
      })
      .catch((err) => {
        const errCode = err.response.data.errorCode;
        console.log(err, errCode);
        if (errCode == 4003) {
          alert(
            '정보 수정을 통해 깃허브나 블로그 주소를 개인 정보에 추가해주세요.'
          );
        } else if (errCode == 105) {
          alert('자신의 글에는 지원할 수 없습니다.');
        }
      });
  };
  return <Button onClick={apply}>신청하기</Button>;
}

export default ApplyBtn;

const Button = styled.button`
  background-color: #c59900b5;
  border: 0px;
  color: #fff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
