import { useState } from "react";
import style from "./boxStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { writePostApi } from "../../../Apis/postApi";
function PostingForm() {
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({
    title: "",
    body: "",
    category: "",
  });
  const [techs, setTechs] = useState("");
  const [tech, setTech] = useState([]);

  console.log(postInfo);
  const handlePostInfo = (e) => {
    console.log(e.target.id, e.target.value);

    setPostInfo({
      ...postInfo,
      [e.target.id]: e.target.value,
    });
  };
  console.log(tech);
  const onClickTehcs = () => {
    setTech(tech.concat(techs));
    console.log(tech);
    alert("추가됐습니다.");
  };
  const handleTech = (e) => {
    setTechs(e.target.value);
  };
  const handlePosting = () => {
    const token = localStorage.accessToken;

    writePostApi(postInfo, token, tech)
      .then((res) => {
        console.log(res);
        alert("글 추가됨");
        navigate("/post");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <input onChange={handlePostInfo} id="title" placeholder="제목"></input>
      <textarea
        onChange={handlePostInfo}
        id="body"
        placeholder="본문"
        className={style.textarea}
      ></textarea>
      <input
        onChange={handlePostInfo}
        id="category"
        placeholder="카테고리"
      ></input>
      <input onChange={handleTech} id="techs" placeholder="기술스택"></input>
      <button onClick={onClickTehcs}>추가</button>

      <button onClick={handlePosting}> 글쓰기 </button>
    </div>
  );
}

export default PostingForm;
