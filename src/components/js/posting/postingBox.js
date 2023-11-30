import { useState } from 'react';
import boxStyle from './boxStyle.module.css';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import studyLogo from '../../../components/img/studyLogo.svg';
import projectLogo from '../../../components/img/projectLogo.svg';
function PostingBox(e) {
  const postId = e.param.id;
  const token = sessionStorage.accessToken;

  return (
    <Link to={`/post/${postId}`}>
      <Box>
        <FlexBox style={{ display: 'flex' }}>
          <Category>
            {e.param.category === 'Study' ? (
              <img src={studyLogo} />
            ) : (
              <img src={projectLogo} />
            )}
          </Category>
          <State>{e.param.state === 'Active' ? '모집중' : '모집종료'}</State>
        </FlexBox>

        <Title>{e.param.title}</Title>
        <Text></Text>
        <div style={{ marginTop: '100px' }}>
          <div style={{ display: 'flex' }}>
            {e.param.techs.map((e) => {
              return <Tech>{e}</Tech>;
            })}
          </div>
          <Line />
          <FlexBox style={{ marginTop: '20px' }}>
            <WritingDate>작성일 | {e.param.createdDate}</WritingDate>
            <ReadCount>조회수: {e.param.readCount}</ReadCount>
          </FlexBox>
        </div>
      </Box>
    </Link>
  );
}

export default PostingBox;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Box = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 0px solid;
  width: 255px;
  height: 250px;
  float: left;

  margin-left: 1vw;
  margin-top: 40px;
`;
const Category = styled.div`
  margin-top: 10px;

  width: 96px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 90px;
  background: #d9d9d9;
`;

export const WritingDate = styled.div`
  color: #9a9a9a;
  font-family: Big Shoulders Display;
  font-size: 16px;
  font-weight: 400;
`;
const Tech = styled.div`
  width: 40px;
  color: #9a9a9a;

  font-size: 16px;
`;
const Title = styled.div`
  margin-top: 20px;
  color: #000;
  font-family: Big Shoulders Display;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const Text = styled.div`
  margin-top: 10px;
  color: #000;
  font-family: Big Shoulders Display;
  font-size: 10px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
const State = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 20px;
`;

const ReadCount = styled.div`
  color: #787878;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 700;
`;
const Line = styled.div`
  width: 250px;
  height: 1px;
  background: #e7e5e5;
`;
