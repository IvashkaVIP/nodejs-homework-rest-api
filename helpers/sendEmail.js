const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.API_KEY_SENDGRID);

const sendMail = async (data) => {
    const email = { ...data, from: "ivashka.co@gmail.com" };
    await sgMail
      .send(email)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

}

module.exports = sendMail;
