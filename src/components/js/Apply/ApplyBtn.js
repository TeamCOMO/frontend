import { applyApi } from '../../../Apis/postApi';

function ApplyBtn(props) {
  const apply = () => {
    applyApi(props.postId)
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  return <button onClick={apply}>신청버튼</button>;
}

export default ApplyBtn;
