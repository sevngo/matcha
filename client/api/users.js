import axios from 'axios';

export const createUser = user => axios.post('/api/users', user);

export const loginUser = user => axios.post('/api/users/login', user);

export const getUsers = token => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get('/api/users', { headers });
};

export const getUser = (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return axios.get(`/api/users/${id}`, { headers });
};

export const patchUser = (token, id, user) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return axios.patch(`/api/users/${id}`, user, { headers });
};

export const uploadImage = (token, id, image) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };
  let formData = new FormData();
  formData.append('image', image);
  return axios.post(`/api/users/${id}/images`, formData, { headers });
};

export const deleteImage = (token, id, imageId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.delete(`/api/users/${id}/images/${imageId}`, { headers });
};
