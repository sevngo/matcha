const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailConfirmation = (email, firstName, lastName, url) => {
  const message = {
    // to: email,
    to: 'sevngo@gmail.com',
    from: 'matcha@matcha.com',
    subject: 'Email confirmation',
    text: `Welcome to Matcha, ${firstName} ${lastName}. Click on this link to confirm your email : ${url}`,
  };
  return sgMail.send(message);
};

module.exports = {
  sendEmailConfirmation,
};

const sendResetPassword = (email, firstName, lastName, url) => {
  const message = {
    // to: email,
    to: 'sevngo@gmail.com',
    from: 'matcha@matcha.com',
    subject: 'Password reset',
    text: `Hello ${firstName} ${lastName}. Click on this link to reset your password : ${url}`,
  };
  return sgMail.send(message);
};

module.exports = {
  sendEmailConfirmation,
  sendResetPassword,
};
