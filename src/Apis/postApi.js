import axios from "axios";

const API = process.env.REACT_APP_API_KEY;
const token = localStorage.accessToken;
export const viewPostApi = (page) => {
  return axios.get(`${API}/api/v1/posts`, {
    params: { page },
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};

export const writePostApi = (postInfo, tech) => {
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

export const getPostApi = (postId) => {
  return axios.get(`${API}/api/v1/post/${postId}`, {
    headers: {
      Authorization: token,

      "Content-Type": "application/json",
    },
  });
};

export const categoryClickApi = (category, page) => {
  return axios.get(`${API}/api/v1/posts`, {
    params: { category, page },
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};

export const editPostApi = (postInfo) => {
  return axios.patch(`${API}/api/v1/post/modify`, postInfo, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};

export const deletePostApi = (postId) => {
  return axios.delete(`${API}/api/v1/post/delete/${postId}`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};
