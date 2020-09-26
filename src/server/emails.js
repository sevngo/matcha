const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('./utils/env');

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmail = (email, subject, text) => {
  const message = {
    to: email,
    from: 'matcha@matcha.com',
    subject,
    text,
  };
  return sgMail.send(message);
};
