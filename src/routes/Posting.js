import Nav from "../components/js/Nav";
import postStyle from "./postStyle.module.css";
import PostingBtn from "../components/js/posting/PostingBtn";
import PostingForm from "../components/js/posting/PostingForm";
function Posting() {
  return (
    <div>
      <Nav />
      <div className={postStyle.totalPostingBox}>
        <PostingBtn param="posintg" />
        <h3 style={{ margin: "40px 0 0 60px" }}>글쓰기</h3>

        <PostingForm />
      </div>
    </div>
  );
}

export default Posting;
