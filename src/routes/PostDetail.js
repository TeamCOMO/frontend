import { useParams } from "react-router-dom"
import { getPostApi } from "../Apis/postApi"
import { useEffect, useState } from "react"
import postStyle from "./postStyle.module.css";

import Nav from "../components/js/Nav"
function PostDetail(){
    const [postInfo,setPostInfo] = useState({})
    const token = localStorage.accessToken
    const postingId = (useParams().postId)
console.log(postInfo)
    useEffect(()=>  
    {
        getPostApi(postingId,token).then(
        (res)=>{
          setPostInfo(res.data)}
      ).catch((err)=>{console.log(err)})},
      [])
  
    return(<div>
              <Nav />
              <div className={postStyle.totalPostingBox}>

        <div>
            <span>제목 : </span>
            <span>{postInfo.title}</span>
            </div>
            <div>
            <span>내용 : </span>
            <span>{postInfo.body}</span>
            </div>

            <div>
            <span>카테고리 : </span>
            <span>{postInfo.category}</span>
            </div>

            <div>
            <span>기술스택 : </span>
            <span>{postInfo.techs}</span>
            </div>


        
            </div>
        
        </div>)
}
export default PostDetail