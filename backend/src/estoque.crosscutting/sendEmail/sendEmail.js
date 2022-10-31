const nodemailer = require('nodemailer');

const remetente = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const email = async (email, subject, texto) =>
  remetente.sendMail(
    {
      from: process.env.USER_EMAIL,
      to: `${email}`,
      subject: `${subject}`,
      //   text: `${texto}`,
      html: `
        <nav>ecommerce webNice!</nav>
        <h1>${texto}<h1>
            </br>
        <p>${new Date()}</p>
        <footer>development by rcastilho@gmail.com</footer>
        `,
    },
    err => {
      if (err) {
        console.log('erro encontrato', err);
      } else {
        // console.log('Email enviado com sucesso!');
      }
    },
  );

module.exports = email;
