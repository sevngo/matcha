const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailConfirmation = (email, firstName, lastName) => {
  const message = {
    to: email,
    from: 'matcha@matcha.com',
    subject: 'Thank you for joining',
    text: `Welcome to Matcha, ${firstName} ${lastName}`,
  };
  return sgMail.send(message);
};

module.exports = {
  sendEmailConfirmation,
};
