import axios from 'axios';

export const postUsers = user => axios.post('/api/users', user);

export const postUsersLogin = user => axios.post('/api/users/login', user);

export const getUsers = (token, query = '') => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/api/users${query}`, { headers });
};

export const getUser = (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(`/api/users/${id}`, { headers });
};

export const patchUser = (token, user) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return axios.patch('/api/users', user, { headers });
};

export const postUsersImages = (token, image) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };
  let formData = new FormData();
  formData.append('image', image);
  return axios.post('/api/users/images', formData, { headers });
};

export const deleteUsersImages = (token, imageId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.delete(`/api/users/images/${imageId}`, { headers });
};

export const postUsersForgot = user => axios.post('/api/users/forgot', user);

export const postUsersReset = ({ token, newPassword }) =>
  axios.patch(`/api/users/reset/${token}`, { newPassword });
