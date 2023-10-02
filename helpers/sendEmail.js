const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.API_KEY_SENDGRID);

// const msg = {
//   to: "test@example.com",
//   from: "test@example.com",
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

const sendMail = async (data) => {
    const emaile = { ...data, from: "ivashka.co@gmail.com" };
    await sgMail
      .send(emaile)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

}

module.exports = sendMail;
