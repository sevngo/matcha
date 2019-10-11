import Users from '../containers/Users';
import User from '../containers/User';
import Reset from '../containers/Reset';
import Verify from '../containers/Verify';

export const homePath = '/';
export const userPath = id => `/user/${id}`;
export const resetPath = token => `/reset/${token}`;
export const verifyPath = token => `/verify/${token}`;

export const routes = [
  {
    path: homePath,
    exact: true,
    component: Users,
  },
  {
    path: userPath(':id'),
    exact: true,
    component: User,
  },
  {
    path: resetPath(':token'),
    exact: true,
    component: Reset,
  },
  {
    path: verifyPath(':token'),
    exact: true,
    component: Verify,
  },
];
