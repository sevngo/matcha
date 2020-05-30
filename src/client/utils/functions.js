import { reduce, filter, isEmpty } from 'ramda';

export const getAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

export const getIds = reduce((acc, object) => [...acc, object._id], []);

export const compact = filter((value) => value && !isEmpty(value));
