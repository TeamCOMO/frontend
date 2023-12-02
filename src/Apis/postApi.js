import axios from 'axios';

const API = process.env.REACT_APP_API_KEY;
let token = sessionStorage.accessToken;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status == 403) {
      alert('토큰이 만료되어 재로그인이 필요합니다.');
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  }
);
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
  const dto = {
    title: postInfo.title,
    body: postInfo.body,
    category: postInfo.category,
    techs: tech,
  };
  const data = new FormData();

  const blob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
  data.append('dto', blob);

  data.append('images', postInfo.image);

  return axios.post(`${API}/api/v1/post`, data, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data', // 또는 'multipart/form-data'
    },
  });
};

export const getPostApi = (postId) => {
  token = sessionStorage.accessToken;

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
  const dto = {
    postId: postInfo.postId,
    title: postInfo.title,
    body: postInfo.body,
    category: postInfo.category,
    techs: postInfo.tech,
  };
  const oldURL = postInfo.images[0];
  const data = new FormData();

  const blob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
  data.append('dto', blob);

  // const blob2 = new Blob([postInfo.image], { type: 'image' });
  console.log(dto, 'dto입니다');
  data.append('images', postInfo.image);

  return axios.patch(`${API}/api/v1/post`, data, {
    headers: {
      'Content-Type': 'multipart/form-data', // 또는 'multipart/form-data'
      Authorization: token,
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

export const applyApi = (postId) => {
  return axios.post(
    `${API}/api/v1/apply/${postId}`,
    {},
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const editUserInfoApi = (editInfo) => {
  console.log(editInfo);
  return axios.patch(`${API}/user`, editInfo, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export const getWriteApi = (page) => {
  return axios.get(`${API}/api/v1/post/myself?${page}`, {
    headers: { Authorization: token },
  });
};

export const getMypageInfo = () => {
  token = sessionStorage.accessToken;

  return axios.get(`${API}/user/my-page`, {
    headers: { Authorization: token },
  });
};

export const getMypageAppliedPost = (page) => {
  return axios.get(
    `${API}/api/v1/post/applied`,
    {
      headers: { Authorization: token },
    },
    { params: { page } }
  );
};

export const getApplyStatus = (postId) => {
  return axios.get(`${API}/user/applied/${postId}`, {
    headers: { Authorization: token },
  });
};
