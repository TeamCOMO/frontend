import { useEffect, useState } from "react";
import { getPostApi } from "../Apis/postApi";
import Nav from "../components/js/Nav";
import PostingForm from "../components/js/posting/PostingForm";
import postStyle from "./postStyle.module.css";
import { useParams } from "react-router-dom";

function EditPost() {
  const [postInfo, setPostInfo] = useState({
    body: "",
    category: "",
    techs: [],
    title: "",
    state: "",
  });
  const postingId = useParams().postId;
  delete postInfo.id;
  postInfo.postId = postingId;
  useEffect(() => {
    getPostApi(postingId)
      .then((res) => {
        setPostInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postingId]);
  console.log(postInfo);

  return (
    <div>
      <Nav />
      <div className={postStyle.totalPostingBox}>
        <PostingForm postType={"editPost"} editPostInfo={postInfo} />
      </div>
    </div>
  );
}

export default EditPost;
