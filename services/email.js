const keys = require("../config/keys");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: keys.EMAIL_USERNAME,
    pass: keys.EMAIL_PASS
  }
});

module.exports = {
  verifyUserEmail: async function verifyUserEmail(firstName, lastName, userEmail, token) {
    try {
      let info = await transporter.sendMail({
        from: keys.EMAIL_USERNAME,
        to: userEmail, 
        subject: `Hope and Anchor Verify Email`,
        html: `${firstName} ${lastName},
        Please verify your email by clicking the link: ${keys.hosturl}/verify-user-email`
      })
    } catch (err) {
      console.log(err)
    }
  }
}