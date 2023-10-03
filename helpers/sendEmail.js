const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.API_KEY_SENDGRID);

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
