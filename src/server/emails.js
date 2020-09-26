const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('./utils/env');

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmail = (email, subject, text) => {
  const message = {
    to: email,
    from: 'webapp@webapp.com',
    subject,
    text,
  };
  return sgMail.send(message);
};
