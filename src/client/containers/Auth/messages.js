import { defineMessages } from 'react-intl';

export default defineMessages({
  enterEmail: {
    id: 'containers.auth.enterEmail',
    defaultMessage:
      'Please enter your e-mail address and we will send you a password reset link.',
  },
  forgotPassword: {
    id: 'containers.auth.forgotPassword',
    defaultMessage: 'Forgot password ?',
  },
  login: {
    id: 'containers.auth.login',
    defaultMessage: 'Login',
  },
  register: {
    id: 'containers.auth.register',
    defaultMessage: 'Register',
  },
  redirectToLogin: {
    id: 'containers.auth.redirectToLogin',
    defaultMessage: 'Create an account ?',
  },
  redirectToRegister: {
    id: 'containers.auth.redirectToRegister',
    defaultMessage: 'I already have an account ?',
  },
});
