import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
