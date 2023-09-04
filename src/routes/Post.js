import Nav from "../components/js/Nav";
import postStyle from "../postStyle.module.css";
function Post() {
  return (
    <div>
      <Nav />
      <div className={postStyle.totalPostingBox}>
        <h3>POSTING</h3>
        <br></br>
        <div className={postStyle.potingBox}>BOX</div>
        <div className={postStyle.potingBox}>BOX</div>
        <div className={postStyle.potingBox}>BOX</div>
        <div className={postStyle.potingBox}>BOX</div>
      </div>
    </div>
  );
}
export default Post;
