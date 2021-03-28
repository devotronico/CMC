const nodemailer = require('nodemailer');

const sendEmailAuth = async (email, uri, verify, subject, htmlPart) => {
  // console.log('EMAIL_USER', process.env.EMAIL_USER);
  // console.log('EMAIL_PASS', process.env.EMAIL_PASS);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOption = {
    from: process.env.EMAIL_FROM, // email del mittente
    to: email, // email del ricevente
    subject: subject,
    html: `${htmlPart}
    <a href="${process.env.DOMAIN}/${uri}/${verify}">CLICCAMI</a><br>
    <p>${process.env.DOMAIN}/${uri}/${verify}</p>`,
  };

  try {
    let info = await transporter.sendMail(mailOption);
    return info;
  } catch (error) {
    return false;
  }
};

module.exports = sendEmailAuth;
