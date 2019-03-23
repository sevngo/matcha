import axios from 'axios';

export const createUser = user => axios.post('/api/users', user);

export const loginUser = user => axios.post('/api/users/login', user);

export const getUsers = (token, filter) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get('/api/users', { headers });
};

export const getUser = (token, id) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`/api/users/${id}`, { headers });
};

export const patchUser = (token, id, user) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.patch(`/api/users/${id}`, user, { headers });
};
