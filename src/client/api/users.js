import axios from 'axios';

export const postUser = (user) => axios.post('/api/users', user);

export const postUserLogin = (user) => axios.post('/api/users/login', user);

export const getUsers = (query = '') => axios.get(`/api/users${query}`);

export const getUser = (id) => axios.get(`/api/users/${id}`);

export const patchUser = (id, user, config) => {
  return axios.patch(`/api/users/${id}`, user, config);
};

export const postUserImage = (id, image) => {
  let formData = new FormData();
  formData.append('image', image);
  return axios.post(`/api/users/${id}/image`, formData);
};

export const getUserImage = (userId, imageId) =>
  `/api/users/${userId}/image/${imageId}`;

export const postUserForgot = (user) => axios.post('/api/users/forgot', user);
