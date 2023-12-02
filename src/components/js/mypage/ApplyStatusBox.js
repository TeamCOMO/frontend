import styled from '@emotion/styled';
import githubImg from '../../img/gihubImg.svg';
import blogImg from '../../img/velogImg.svg';
import { Link } from 'react-router-dom';
function ApplyStatusBox(props) {
  const info = props.info;
  return (
    <Box>
      <Info>닉네임: {info.nickname}</Info>
      <Info>이메일: {info.email}</Info>
      <div>포트폴리오</div>
      {info.github_url === '' ? (
        ''
      ) : (
        <Link to={info.github_url}>
          <img src={githubImg}></img>
        </Link>
      )}
      {info.blog_url == '' ? (
        ''
      ) : (
        <Link to={info.github_url}>
          <img src={blogImg}></img>
        </Link>
      )}
    </Box>
  );
}

export default ApplyStatusBox;

const Box = styled.div`
  width: 255px;
  height: 298px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
`;
const Info = styled.div`
  display: flex;
`;
