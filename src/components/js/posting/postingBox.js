import { useState } from "react";
import boxStyle from "./boxStyle.module.css";
function PostingBox(e) {
  console.log(e, "postingBox");
  return (
    <div className={boxStyle.potingBox}>
      <div>제목: {e.param.title}</div>
      <div>본문: {e.param.body}</div>
      <div>카테고리: {e.param.category}</div>
    </div>
  );
}

export default PostingBox;
