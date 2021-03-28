const nodemailer = require('nodemailer');

// email del mittente
// rejectUnauthorized: do not fail on invalid certs
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dmanzi83@gmail.com',
    pass: 'Broli regna corre salt4'
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;
