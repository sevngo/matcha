import { find } from 'ramda';
import Users from '../containers/Users';
import User from '../containers/User';
import Reset from '../containers/Reset';
import Verify from '../containers/Verify';
import Auth from '../containers/Auth';

export const usersPath = '/';
export const userPath = (id) => `/user/${id}`;
export const resetPath = (token) => `/reset/${token}`;
export const verifyPath = (token) => `/verify/${token}`;
export const loginPath = '/login';

export const routes = [
  {
    path: usersPath,
    exact: true,
    component: Users,
    isPrivate: true,
    isDefault: true,
  },
  {
    path: userPath(':id'),
    exact: true,
    component: User,
    isPrivate: true,
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
  {
    path: loginPath,
    exact: true,
    component: Auth,
  },
];

export const defaultRoute = find((route) => route.isDefault)(routes);
