import { useEffect, useState, useParams } from 'react';
import boxStyle from './boxStyle.module.css';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import studyLogo from '../../../components/img/studyLogo.svg';
import projectLogo from '../../../components/img/projectLogo.svg';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import axios from 'axios';

function PostingBox(e) {
  console.log(e);
  const postId = e.param?.id;

  let accessToken = sessionStorage.accessToken;
  const token = localStorage.accessToken;
  const [heart, setHeart] = useState(false); //heart 값 초기값 false 설정
  const API = process.env.REACT_APP_API_KEY;
  const [heartCount, setHeartCount] = useState(0); // 하트 수 저장하는 상태

  const handleHeartClick = () => {
    console.log('handleHeartClick 함수 안에 도착함');
    axios
      .post(
        `${API}/api/v1/post/${postId}/heart`,
        {
          postId: postId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem('accessToken', res.data);
        setHeartCount(heartCount + 1);
        console.log('하트증가성공:', res.data);
        <AiFillHeart style={{ color: 'red', fontSize: '30px' }} />;
      })
      .catch((error) => {
        console.error('하트 클릭에 실패했습니다:', error);
      });
  };

  const handleHeartDeleteClick = () => {
    console.log('하트취소 함수 안에 도착함');
    axios
      .delete(`${API}/api/v1/post/${postId}/heart`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem('accessToken', res.data);
        setHeartCount(heartCount - 1);
        console.log("하트'취소'에 성공 : ", res.data);
        <AiOutlineHeart style={{ color: 'gray', fontSize: '30px' }} />;
      })
      .catch((error) => {
        console.error("하트'취소' 실패", error);
      });
  };
  const onHeartClick = () => {
    if (!heart) {
      handleHeartClick();
      setHeart(true); // 상태를 true로 변경
    } else {
      handleHeartDeleteClick();
      setHeart(false); // 상태를 false로 변경
    }
  };
  {
    /*}
  const handleHeart = (heart) => {
    console.log("handleHeart 함수 안에 들어옴");
    //console.log("setHeart(!heart);실행");
    if (!heart) {
      //하트가 안 눌러져 있을 때 등록
      handleHeartClick(); // axios 통신 실행
      console.log("handleHeartClick(); 실행 성공");
      setHeart(heart);
    } else if (heart) {
      //하트 눌러져 있을때 취소
      handleHeartDeleteClick(); // axios 통신 실행
      console.log("handleHeartDeleteClick(); 실행 성공");
      setHeart(!heart);
    } else {
      console.log("handleHeart 정상작동 실패");
    }
  };*/
  }

  console.log(e.param, 'postingBox');
  return (
    <Box>
      <Link to={`/post/${postId}`} style={{ textDecoration: 'none' }}>
        <FlexBox style={{ display: 'flex' }}>
          <Category>
            {e.param?.category === 'Study' ? (
              <img src={studyLogo} />
            ) : (
              <img src={projectLogo} />
            )}
          </Category>
          <State>{e.param?.state === 'Active' ? '모집중' : '모집종료'}</State>
        </FlexBox>

        <Title>{e.param?.title}</Title>

        <div style={{ display: 'flex' }}>
          {e.param?.techs.map((e) => {
            return <Tech>{e}</Tech>;
          })}
        </div>

        <Line />
      </Link>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <WritingDate>작성일 | {e.param?.createdDate}</WritingDate>
        <ReadCount>조회수: {e.param?.readCount}</ReadCount>
        <div onClick={onHeartClick}>
          {heart ? (
            <AiFillHeart style={{ color: 'red', fontSize: '30px' }} />
          ) : (
            <AiOutlineHeart style={{ color: 'gray', fontSize: '30px' }} />
          )}
        </div>
      </div>
    </Box>
  );
}

export default PostingBox;

const NickName = styled.div`
  font-size: 20px;
  top: 0;
  color: '#FFD339';
`;
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
  margin-top: 30px;
  margin-left: 10px;
  width: 40px;
  color: #9a9a9a;

  font-size: 16px;
`;
const Title = styled.div`
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
  margin-top: 20px;
  width: 250px;
  height: 110px;
  color: #000;

  font-size: 16px;
  font-weight: 900;
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
  font-size: 13px;
  font-weight: 700;
`;
const Line = styled.div`
  width: 250px;
  height: 1px;
  background: #e7e5e5;
`;
//const Heart = styled.div`
