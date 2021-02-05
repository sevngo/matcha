import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from './utils/env.js';

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = (email, subject, text) => {
  const message = {
    to: email,
    from: 'matcha@matcha.com',
    subject,
    text,
  };
  return sgMail.send(message);
};

export default sendEmail;
