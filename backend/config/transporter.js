const nodemailer = require('nodemailer');

/// QUnado l email del mittente è errata da il seguente errore:
// 0] Error: Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at
// [0] 535 5.7.8  https://support.google.com/mail/?p=BadCredentials q125sm2256835wme.19 - gsmtp
// [0]     at SMTPConnection._formatError (D:\Sviluppo Web\Mern\mern-blog\backend\node_modules\nodemailer\lib\smtp-connection\index.js:784:19)
// [0]     at SMTPConnection._actionAUTHComplete (D:\Sviluppo Web\Mern\mern-blog\backend\node_modules\nodemailer\lib\smtp-connection\index.js:1523:34)
// [0]     at SMTPConnection.<anonymous> (D:\Sviluppo Web\Mern\mern-blog\backend\node_modules\nodemailer\lib\smtp-connection\index.js:550:26)
// [0]     at SMTPConnection._processResponse (D:\Sviluppo Web\Mern\mern-blog\backend\node_modules\nodemailer\lib\smtp-connection\index.js:942:20)
// [0]     at SMTPConnection._onData (D:\Sviluppo Web\Mern\mern-blog\backend\node_modules\nodemailer\lib\smtp-connection\index.js:749:14)
// [0]     at TLSSocket.SMTPConnection._onSocketData (D:\Sviluppo Web\Mern\mern-blog\backend\node_modules\nodemailer\lib\smtp-connection\index.js:195:44)
// [0]     at TLSSocket.emit (events.js:321:20)
// [0]     at addChunk (_stream_readable.js:294:12)
// [0]     at readableAddChunk (_stream_readable.js:275:11)
// [0]     at TLSSocket.Readable.push (_stream_readable.js:209:10)
// [0]     at TLSWrap.onStreamRead (internal/stream_base_commons.js:186:23) {
// [0]   code: 'EAUTH',
// [0]   response: '535-5.7.8 Username and Password not accepted. Learn more at\n' +
// [0]     '535 5.7.8  https://support.google.com/mail/?p=BadCredentials q125sm2256835wme.19 - gsmtp',
// [0]   responseCode: 535,
// [0]   command: 'AUTH PLAIN'

/// Se l email del destinatario è errata:
// INFO: {
//   [0]   accepted: [ 'dmanzi83@outlook.com123' ],
//   [0]   rejected: [],
//   [0]   envelopeTime: 528,
//   [0]   messageTime: 800,
//   [0]   messageSize: 574,
//   [0]   response: '250 2.0.0 OK  1582710048 i204sm2223635wma.44 - gsmtp',
//   [0]   envelope: { from: 'dmanzi83@gmail.com', to: [ 'dmanzi83@outlook.com123' ] },
//   [0]   messageId: '<46425aec-b4f9-fb5f-2a17-717440d3fd55@gmail.com>'
//   [0] }

// INFO: {
//   accepted: [ 'dmanzi83@outlook.com' ],
//   rejected: [],
//   envelopeTime: 1583,
//   messageTime: 1408,
//   messageSize: 571,
//   response: '250 2.0.0 OK  1582708893 j66sm2181754wmb.21 - gsmtp',
//   envelope: { from: 'dmanzi83@gmail.com', to: [ 'dmanzi83@outlook.com' ] },
//   messageId: '<a40b997d-59fe-40dc-5756-db0733f6dcec@gmail.com>'
// }

// const button = `<table border="0" cellspacing="0" cellpadding="0">
// <tbody>
//    <tr>
//       <td align="left" style="border-radius: 3px;" bgcolor="#17bef7"> <a class="button raised" href="http://paulgoddarddesign.com/email-marketing" target="_blank" style="font-size: 14px; line-height: 14px; font-weight: 500; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 3px; padding: 10px 25px; border: 1px solid #17bef7; display: inline-block;">BUTTON</a> </td>
//    </tr>
// </tbody>
// </table>`;

const sendEmailAuth = async (email, uri, verify, subject, htmlPart) => {
  // console.log('EMAIL_USER', process.env.EMAIL_USER);
  // console.log('EMAIL_PASS', process.env.EMAIL_PASS);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOption = {
    from: process.env.EMAIL_FROM, // email del mittente
    to: email, // email del ricevente
    subject: subject,
    html: `${htmlPart}
    <a href="${process.env.DOMAIN}/${uri}/${verify}">CLICCAMI</a><br>
    <p>${process.env.DOMAIN}/${uri}/${verify}</p>`
  };

  try {
    let info = await transporter.sendMail(mailOption);
    return info;
  } catch (error) {
    return false;
  }
};

module.exports = sendEmailAuth;
