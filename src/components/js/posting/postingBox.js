import { useEffect, useState, useParams } from 'react';
import boxStyle from './boxStyle.module.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import studyLogo from '../../../components/img/studyLogo.svg';
import projectLogo from '../../../components/img/projectLogo.svg';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import axios from 'axios';
import reactLogo from '../../img/React-icon.svg';
import springLogo from '../../img/springLogo.svg';

function PostingBox(e) {
  const postId = e.param?.id;
  const navigate = useNavigate();
  let accessToken = sessionStorage.accessToken;
  const [heart, setHeart] = useState(false); //heart 값 초기값 false 설정
  const [scrap, setScrap] = useState(false);
  const API = process.env.REACT_APP_API_KEY;
  const [heartCount, setHeartCount] = useState(0); // 하트 수 저장하는 상태
  const [interestId, setInterestId] = useState(null);

  const onScrapClick = () => {
    if (!scrap) {
      handleScrapClick();
      setScrap(true); // 상태를 true로 변경
    } else {
      handleScrapDeleteClick();
      setScrap(false); // 상태를 false로 변경
    }
  };

  const handleScrapClick = () => {
    setScrap(true);
    console.log('스크랩 함수 안에 도착함');
    const confirmScrap = window.confirm('스크랩 하겠습니까?');
    if (confirmScrap) {
      axios
        .post(
          `${API}/api/v1/interest`,
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
          console.log('스크랩 성공:', res.data);
          setScrap(true);
          setInterestId(res.data.interestId); // Assuming res.data.interestId is the correct path to the interestId
        })
        .catch((error) => {
          console.error('스크랩에 실패했습니다:', error);
        });
    } else {
      console.log('스크랩 취소');
    }
  };

  const handleScrapDeleteClick = () => {
    //event.stopPropagation();
    const confirmScrap = window.confirm(
      '이미 스크랩 된 글입니다.\n스크랩을 취소 하겠습니까?'
    );
    if (confirmScrap) {
      console.log('스크랩 취소 함수 안에 도착함');
      axios
        .delete(`${API}/api/v1/interest/${interestId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        })
        .then((res) => {
          localStorage.setItem('accessToken', res.data);
          setScrap(false);
          console.log("스크랩'취소'에 성공 : ", res.data);
          setScrap(false);
          setInterestId(null); // Reset interestId after successful delete
        })
        .catch((error) => {
          console.error("스크랩'취소' 실패", error);
        });
    } else {
    }
  };

  const handleHeartClick = () => {
    console.log('handleHeartClick 함수 안에 도착함');
    const confirmScrap = window.confirm('하트를 누르시겠습니까?');
    if (confirmScrap) {
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
          //<AiFillHeart style={{ color: 'red', fontSize: '30px' }} />;
        })

        .catch((error) => {
          console.error('하트 클릭에 실패했습니다:', error);
        });
    } else {
    }
  };

  const handleHeartDeleteClick = () => {
    console.log('하트취소 함수 안에 도착함');
    const confirmScrap = window.confirm(
      '이미 하트를 누른 글입니다.\n하트를 취소 하겠습니까?'
    );
    if (confirmScrap) {
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
    } else {
    }
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

  const handleLink = () => {
    if (accessToken == '') {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/signin');
    } else navigate(`/post/${postId}`);
  };
  return (
    <Box>
      <FlexBox style={{ display: 'flex' }}>
        <Category>
          {e.param?.category === 'Study' ? (
            <img src={studyLogo} />
          ) : (
            <img src={projectLogo} />
          )}
        </Category>
        {e.status == true ? (
          <Link to={`/mypage/status/${postId}`}>
            <Status>지원 현황 보기</Status>
          </Link>
        ) : (
          ''
        )}
        <State>{e.param?.state === 'Active' ? '모집중' : '모집종료'}</State>
      </FlexBox>

      <Click onClick={handleLink}>
        <Title>{e.param?.title}</Title>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'flex' }}>
            {e.param?.techs.map((e) => {
              return (
                <Tech>
                  {e == 'React' ? (
                    <Logo src={reactLogo} />
                  ) : (
                    <Logo src={springLogo} />
                  )}
                </Tech>
              );
            })}
          </div>
        </div>
        <WritingDate>작성일 | {e.param?.createdDate}</WritingDate>

        <Line />
      </Click>

      <FlexBox style={{ marginTop: '5px' }}></FlexBox>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: '5px',
        }}
      >
        <Nickname>{e.param?.nickname}</Nickname>
        <ReadCount>조회수: {e.param?.readCount}</ReadCount>
        <HeartDiv onClick={onHeartClick}>
          {heart ? (
            <AiOutlineHeart style={{ color: 'gray', fontSize: '30px' }} />
          ) : (
            <AiOutlineHeart style={{ color: 'gray', fontSize: '30px' }} />
          )}
        </HeartDiv>
        <ScrapDiv onClick={onScrapClick}>
          <BsBookmarkPlusFill
            style={{ fontSize: '30px', marginleft: '50px', color: 'gray' }}
          />
        </ScrapDiv>
      </div>
    </Box>
  );
}

export default PostingBox;

const HeartDiv = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const ScrapDiv = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const Click = styled.div`
  &:hover {
    cursor: pointer;
  }
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
  font-size: 14px;
  font-weight: 400;
  margin-left: 10px;
`;
export const Nickname = styled.div`
  color: black;
  font-family: Big Shoulders Display;
  font-size: 16px;
  font-weight: 600;
`;
const Tech = styled.div`
  margin-left: 10px;
  width: 40px;
  color: #9a9a9a;
  font-size: 16px;
  height: 30px;
  display: flex;
`;
const Title = styled.div`
  overflow-wrap: break-word;
  margin-left: 10px;
  margin-top: 20px;
  width: 230px;

  height: 76px;
  color: #000;
  overflow-y: hidden;
  text-overflow: ellipsis;
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
  margin-right: 10px;
  width: 50px;
`;

const ReadCount = styled.div`
  color: #787878;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 700;
`;
const Line = styled.div`
  width: 250px;
  height: 2px;
  background: #e7e5e5;
  margin-top: 12px;
`;
const Status = styled.button`
  margin-left: 4px;
  color: #fff;
  background-color: black;
  height: 30px;
  &:hover {
    box-shadow: 3px 3px 3px rgb(172, 172, 172), 3px 3px 3px rgb(237, 237, 237);
    transition: 0.1s;
  }
`;
const Logo = styled.img`
  width: 30px;

  display: flex;
`;
