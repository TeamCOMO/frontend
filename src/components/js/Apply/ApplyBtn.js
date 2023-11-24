import { useNavigate } from 'react-router-dom';
import { applyApi } from '../../../Apis/postApi';

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
        if (err.response.data.errorCode == 4003) {
          alert('을 통해 깃허브나 블로그 주소를 개인 정보에 추가해주세요.');
        }
        navigate('/mypage');
      });
  };
  return <button onClick={apply}>신청버튼</button>;
}

export default ApplyBtn;
