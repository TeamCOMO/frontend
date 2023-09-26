import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Cateogory.module.css";
import { categoryClickApi, viewPostApi } from "../../../Apis/postApi";
import PostingBox from "./postingBox";
import { postState } from "../../../recoils/Recoil";
import { useRecoilState } from "recoil";
function CategoryBtn() {
  const [clicked, setClicked] = useState("");
  const category = ["전체", "Project", "Study"];
  const [posts, setPosts] = useRecoilState(postState);
  useEffect(() => {
    console.log(clicked);
  }, [clicked]);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  const handleCategory = (e) => {
    setClicked(e.target.id);
    {
      e.target.id == "전체"
        ? viewPostApi(1)
            .then((res) => {
              console.log(res.data.posts);
              setPosts(res.data.posts);
            })
            .catch((error) => {
              console.log(error);
            })
        : categoryClickApi(e.target.id, 1)
            .then((res) => {
              console.log(res.data.posts);
              setPosts(res.data.posts);
            })
            .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        {category.map((e) => {
          return (
            <div>
              <button
                id={e}
                onClick={handleCategory}
                className={style.Btn}
                style={
                  e === clicked
                    ? { background: "yellowgreen" }
                    : { background: "#fff" }
                }
              >
                {e}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CategoryBtn;
