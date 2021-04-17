import instance from './';

export const postUser = (user) => instance.post('/api/users', user);

export const postUserLogin = (user) => instance.post('/api/users/login', user);

export const getUsers = (query) => instance.get(`/api/users${query}`);

export const getUser = (id) => instance.get(`/api/users/${id}`);

export const patchUser = (user, config) => {
  return instance.patch('/api/users', user, config);
};

export const postUserImage = (id, image) => {
  let formData = new FormData();
  formData.append('image', image);
  return instance.post(`/api/users/${id}/image`, formData);
};

export const getUserImage = (userId, imageId) =>
  `/api/users/${userId}/image/${imageId}`;

export const postUserForgot = (user) =>
  instance.post('/api/users/forgot', user);
