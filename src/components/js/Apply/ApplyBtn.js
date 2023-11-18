import { applyApi } from '../../../Apis/postApi';

function ApplyBtn(props) {
  const apply = () => {
    applyApi(props.postId)
      .then((res) => {
        console.log(res);
        alert('신청되었습니다!');
      })
      .catch((err) => console.log(err));
  };
  return <button onClick={apply}>신청버튼</button>;
}

export default ApplyBtn;
