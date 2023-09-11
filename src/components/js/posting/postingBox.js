import { useState } from "react";
import boxStyle from "./boxStyle.module.css";
function PostingBox() {
  const [postInfo, setPostInfo] = useState({
    postTitle: "1",
    content: "1",
    writer: "1",
  });
  return (
    <div className={boxStyle.potingBox}>
      <div>{postInfo.postTitle}</div>
      <div>{postInfo.content}</div>
      <div>{postInfo.writer}</div>
    </div>
  );
}

export default PostingBox;
