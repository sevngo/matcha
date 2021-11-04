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
    key: usersPath,
    path: usersPath,
    exact: true,
    Component: Users,
    isPrivate: true,
    isDefault: true,
  },
  {
    key: userPath(':id'),
    path: userPath(':id'),
    exact: true,
    Component: User,
    isPrivate: true,
  },
  {
    key: resetPath(':token'),
    path: resetPath(':token'),
    exact: true,
    Component: Reset,
  },
  {
    key: verifyPath(':token'),
    path: verifyPath(':token'),
    exact: true,
    Component: Verify,
  },
  {
    key: loginPath,
    path: loginPath,
    exact: true,
    Component: Login,
    isUnPrivate: true,
  },
  {
    key: registerPath,
    path: registerPath,
    exact: true,
    Component: Register,
    isUnPrivate: true,
  },
];

export const defaultRoute = find(prop('isDefault'))(routes);
