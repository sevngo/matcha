const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('./utils/constants');

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmail = (email, subject, text) => {
  const message = {
    // to: email,
    to: 'sevngo@gmail.com',
    from: 'matcha@matcha.com',
    subject,
    text,
  };
  return sgMail.send(message);
};
