import axios from 'axios';

const API = process.env.REACT_APP_API_KEY;
const token = localStorage.accessToken;
export const viewPostApi = (page) => {
  return axios.get(`${API}/api/v1/post`, {
    params: { page },
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export const writePostApi = (postInfo, tech) => {
  console.log(postInfo);
  const dto = {
    title: postInfo.title,
    body: postInfo.body,
    category: postInfo.category,
    techs: tech,
  };
  const data = new FormData();

  const blob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
  data.append('dto', blob);

  // const blob2 = new Blob([postInfo.image], { type: 'image' });

  data.append('images', postInfo.image);

  return axios.post(`${API}/api/v1/post`, data, {
    headers: {
      'Content-Type': 'multipart/form-data', // 또는 'multipart/form-data'

      Authorization: token,
    },
  });
};

export const getPostApi = (postId) => {
  return axios.get(`${API}/api/v1/post/${postId}`, {
    headers: {
      Authorization: token,

      'Content-Type': 'application/json',
    },
  });
};

export const categoryClickApi = (category, page) => {
  return axios.get(`${API}/api/v1/post`, {
    params: { category, page },
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export const editPostApi = (postInfo) => {
  return axios.patch(`${API}/api/v1/post`, postInfo, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export const deletePostApi = (postId) => {
  return axios.delete(`${API}/api/v1/post/${postId}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};
