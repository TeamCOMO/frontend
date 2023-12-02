import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePostApi, getPostApi } from "../Apis/postApi";
import { useEffect, useState } from "react";
import postStyle from "./postStyle.module.css";
import Nav from "../components/js/Nav";
import ApplyBtn from "../components/js/Apply/ApplyBtn";
import styled from "@emotion/styled";
import { WritingDate } from "../components/js/posting/postingBox";
import axios from "axios";
import style from "../routes/PostDetail.module.css";
import { jwtDecode } from "jwt-decode";

function PostDetail() {
  const [postInfo, setPostInfo] = useState({});
  const [comment, setComment] = useState(""); // 댓글을 저장하는 상태 변수
  const [comments, setComments] = useState([]); // 댓글 리스트를 저장하는 상태 변수
  const API = process.env.REACT_APP_API_KEY;
  const [body, setBody] = useState(""); // 내용을 저장하는 상태 변수
  const [commentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [nicknameFromToken, setNicknameFromToken] = useState("");

  let accessToken = sessionStorage.accessToken;
  const postingId = useParams().postId;
  const token = sessionStorage.getItem("accessToken");

  console.log(comments);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token: ", decodedToken);
        const nicknameFromToken = decodedToken.nickname;
        console.log("Nickname from Token: ", nicknameFromToken);
        setNicknameFromToken(decodedToken.nickname); // 토큰에서 nickname 설정
      } catch (error) {
        console.error("Error decoding token: ", error);
      }
    }
    getPostApi(postingId)
      .then((res) => {
        setPostInfo(res.data);
        setComment(comment);
        setComment(comments);
        setComment(res.data.comments || []); // 댓글 데이터 설정
        setBody(res.data.data);
        //editingComment(res.data);
        //  handleComments(); // 컴포넌트가 마운트되거나 종속성이 변경될 때 댓글을 불러옵니다.
      })
      .catch((err) => {
        console.log(err);
      });
    handleComments();
  }, [postingId, token]);
  console.log("token : " + token);

  const navigate = useNavigate();
  const handleDeletePost = () => {
    deletePostApi(postingId)
      .then((res) => {
        navigate("/post");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  console.log(postInfo);
  console.log("실시간 입력 댓글 : " + comment);
  //console.log("댓글 닉네임 : " + comment.nickname);

  // 댓글 기능 : 댓글 입력 완료 후 사용자의 닉네임과 함께 보이도록 설정
  const handleComment = () => {
    if (window.confirm("댓글을 입력하시겠습니까?")) {
      if (comment.trim() === "") {
        alert("내용을 입력해주세요!");
        return;
      }
      axios
        .post(
          `${API}/api/v1/post/${postingId}/comment`, // 댓글을 등록하는 API의 경로
          {
            body: comment,
          },
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("댓글 입력 성공!");
          console.log(comment);
          // 서버로부터 응답을 받았을 때의 처리
          setComment(""); // 댓글 입력 필드를 초기화
          //setComments((prevComments) => [...prevComments, res.data.data]); // 댓글을 배열에 추가
        })
        .catch((error) => {
          console.error(error);
          console.log("댓글 입력 실패ㅠㅠ");
        });
    }
    setComments((prevComments) => [...prevComments, comment]);
    setComment(""); // 댓글 입력 필드 초기화
  };

  // 댓글 불러오기 기능 : 댓글 입력 완료 후 사용자의 닉네임과 함께 보이도록 설정
  const handleComments = () => {
    axios
      .get(`${API}/api/v1/post/${postingId}/comments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log("댓글 불러오기 성공!");
        setComments(res.data.comments); // 가져온 데이터로 comments 상태를 업데이트합니다.
      })
      .catch((error) => {
        console.error(error);
        console.log("댓글 불러오기 실패ㅠㅠ");
      });
    console.log("댓글 불러오기" + comments);
  };

  // 댓글 수정 기능
  const handleCommentUpdate = () => {
    // console.log("댓글 수정 함수 실행");
    if (window.confirm("댓글을 수정하시겠습니까?")) {
      axios
        .patch(
          `${API}/api/v1/comment/${commentId}`,
          {
            body: editingComment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          }
        )
        .then((res) => {
          setComments(
            comments.map((singleComment) =>
              singleComment.id === commentId
                ? { ...singleComment, body: editingComment }
                : singleComment
            )
          );

          setEditingCommentId(null);
          setEditingComment("");
          console.log("댓글 수정 완료!");
          console.log("commentId : " + comment.id);
          //handleComments(comment); //이거 하면 바로 삭제됨
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //수정 상태를 활성화하는 함수
  const handleEditComment = (singleComment) => {
    console.log("수정 상태를 활성화 handleEditComment 함수 실행");
    setEditingCommentId(singleComment.id); // 수정할 댓글의 ID 설정
    setEditingComment(singleComment.body); // 현재 댓글의 내용으로 편집 필드 초기화
  };

  //댓글 삭제 기능
  const handleDeleteComment = (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios
        .delete(`${API}/api/v1/comment/${commentId}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log("댓글 삭제 완료!");
          setComments(comments.filter((comment) => comment.id !== commentId));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Nav />
      <Background className={postStyle.background}>
        <div className={postStyle.totalPostingBox}>
          <PostContatiner>
            <PostDetailContainer>
              <div>
                <img style={{ width: "100px" }} src={postInfo.images}></img>
              </div>
              <Title>{postInfo.title}</Title>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>{postInfo.writer}</div>
                <WritingDate style={{ marginLeft: "40px" }}>
                  작성일 {postInfo.createdDate}
                </WritingDate>
                <div style={{ marginLeft: "auto" }}>
                  {postInfo.writer === nicknameFromToken ? (
                    <>
                      <Link to={`/editpost/${postingId}`}>
                        <button className={style.ActionButton}>수정하기</button>
                      </Link>
                      <button
                        onClick={handleDeletePost}
                        className={style.ActionButton}
                      >
                        삭제하기
                      </button>
                      <button className={style.ActionButton}>지원현황</button>
                    </>
                  ) : (
                    <ApplyBtn postId={postingId}></ApplyBtn>
                  )}
                </div>
              </div>
              <Line />
              <Body>{postInfo.body}</Body>
              <div>
                <span>카테고리 : </span>
                <span>{postInfo.category}</span>
              </div>
              <div>
                <span>기술스택 : </span>
                <span>{postInfo.techs}</span>
              </div>
              <div>
                {token ? (
                  <div>
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="댓글을 입력하세요..."
                      className={style.inputs}
                    />
                    <button
                      onClick={handleComment}
                      className={style.ActionButton}
                    >
                      입력 완료
                    </button>
                  </div>
                ) : (
                  <p>
                    <Link to="/signin">로그인</Link>을 해야합니다.
                  </p>
                )}
              </div>
              <div>
                <div>
                  <h3>댓글:</h3>
                  {comments.map((singleComment, index) => (
                    <div key={index} className={style.commentContainer}>
                      {commentId === singleComment.id ? (
                        <div>
                          <input
                            type="text"
                            value={editingComment}
                            onChange={(e) => setEditingComment(e.target.value)}
                            placeholder="댓글 수정..."
                            className={style.commentEditInput} // Added class for styling
                          />
                          <button
                            onClick={() => handleCommentUpdate(singleComment)}
                            className={style.ActionButton} // Added class for styling
                          >
                            수정 완료
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className={style.commentBody}>
                            {singleComment.body}
                          </p>
                          <p className={style.commentNickname}>
                            {singleComment.nickname}
                          </p>
                          <p className={style.commentTime}>
                            {singleComment.createdTime}
                          </p>
                          {singleComment.nickname === nicknameFromToken && (
                            <>
                              <button
                                onClick={() => handleEditComment(singleComment)}
                                className={style.ActionButton} // Added class for styling
                              >
                                수정
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteComment(singleComment.id)
                                }
                                className={style.ActionButton} // Added class for styling
                              >
                                삭제
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Line />
            </PostDetailContainer>
          </PostContatiner>
        </div>
      </Background>
    </div>
  );
}
export default PostDetail;
const PostContatiner = styled.div`
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
`;
const PostDetailContainer = styled.div`
  width: 850px;
  height: 100vh;
  margin: 0 auto;
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;

  position: flex;
  position: relative;
`;
const Title = styled.div`
  display: flex;
  width: 815px;
  height: 65.859px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #000;
  font-family: Big Shoulders Display;
  font-size: 40px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
const Line = styled.div`
  width: 850px;
  height: 3px;
  background: #e3e3e3;
`;
const Body = styled.div`
  display: flex;
  margin-top: 40px;
  width: 850px;
  height: 400px;

  flex-shrink: 0;
  color: #000;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 700;
`;
