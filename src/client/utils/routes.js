import { lazy } from 'react';
import { find, prop } from 'ramda';

const Users = lazy(() => import('../containers/Users'));
const User = lazy(() => import('../containers/User'));
const Reset = lazy(() => import('../containers/Reset'));
const Verify = lazy(() => import('../containers/Verify'));
const Login = lazy(() => import('../containers/Login'));
const Register = lazy(() => import('../containers/Register'));

export const usersPath = '/';
export const userPath = (id) => `/user/${id}`;
export const resetPath = (token) => `/reset/${token}`;
export const verifyPath = (token) => `/verify/${token}`;
export const loginPath = '/login';
export const registerPath = '/register';

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
    component: Login,
  },
  {
    path: registerPath,
    exact: true,
    component: Register,
  },
];

export const defaultRoute = find(prop('isDefault'))(routes);
