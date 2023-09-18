import { useState } from "react";
import boxStyle from "./boxStyle.module.css";
import { Link } from "react-router-dom";
import { getPostApi } from "../../../Apis/postApi";
function PostingBox(e) {
  const postId = (e.param.id)
  const token = localStorage.accessToken
  
  console.log(e, "postingBox");
  return (
    <Link to= {`/post/${postId}`}>
      <div className={boxStyle.postingBox}>
      <div >제목: {e.param.title}</div>
      <div>본문: {e.param.body}</div>
      <div>카테고리: {e.param.category}</div>
      <div>기술 스택: {e.param.techs}</div>
      </div>
    </Link>
  );
}

export default PostingBox;
