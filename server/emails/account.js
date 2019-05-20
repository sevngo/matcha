const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('../utils/constants');

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmailConfirmation = (email, firstName, lastName, url) => {
  const message = {
    // to: email,
    to: 'sevngo@gmail.com',
    from: 'matcha@matcha.com',
    subject: 'Email confirmation',
    text: `Welcome to Matcha, ${firstName} ${lastName}. Click on this link to confirm your email : ${url}`,
  };
  return sgMail.send(message);
};

exports.sendResetPassword = (email, firstName, lastName, url) => {
  const message = {
    // to: email,
    to: 'sevngo@gmail.com',
    from: 'matcha@matcha.com',
    subject: 'Password reset',
    text: `Hello ${firstName} ${lastName}. Click on this link to reset your password : ${url}`,
  };
  return sgMail.send(message);
};
