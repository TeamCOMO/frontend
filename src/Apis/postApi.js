import axios from "axios";

const API = process.env.REACT_APP_API_KEY;

export const viewPostApi = (token, page) => {
  return axios.get(`${API}/api/v1/posts/`, null, {
    params: { page },
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};

export const writePostApi = (postInfo, token, tech) => {
  return axios.post(
    `${API}/api/v1/post/create`,
    {
      title: postInfo.title,
      body: postInfo.body,
      category: postInfo.category,
      techs: tech,
    },
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getPostApi = (postId,token) =>{
  return axios.get(
    `${API}/api/v1/post/${postId}`,{headers:{
       Authorization: token,
      "Content-Type": "application/json"}}
  )
}