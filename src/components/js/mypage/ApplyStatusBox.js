import styled from '@emotion/styled';
import githubImg from '../../img/gihubImg.svg';
import blogImg from '../../img/velogImg.svg';
import { Link } from 'react-router-dom';
function ApplyStatusBox(props) {
  const info = props.info;
  const handleLink = () => {
    window.location.href = `${info.github_url}`;
  };
  const handleLinkVelog = () => {
    window.location.href = `${info.blog_url}`;
  };
  return (
    <Box>
      <div style={{ marginLeft: '30px' }}>
        <Info style={{ fontSize: '30px', paddingTop: '50px' }}>
          {info.nickname}
        </Info>
        <Info style={{ color: 'gray' }}>{info.email}</Info>
        <Pot>
          {info.github_url === '' ? (
            ''
          ) : (
            <Logo onClick={handleLink}>
              <img src={githubImg}></img>
            </Logo>
          )}
          {info.blog_url == '' ? (
            ''
          ) : (
            <Logo onClick={handleLinkVelog}>
              <img src={blogImg}></img>
            </Logo>
          )}
        </Pot>
      </div>
    </Box>
  );
}

export default ApplyStatusBox;

const Box = styled.div`
  width: 255px;
  height: 240px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
`;
const Info = styled.div`
  display: flex;
`;
const Pot = styled.div`
  margin-top: 30px;
  width: 100px;
  display: flex;
  justify-content: space-around;
`;

const Logo = styled.div`
  cursor: pointer;
`;
