const nodemailer = require('nodemailer')
require('dotenv').config()
const mailSender = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS_KEY,
    },
  }
)

module.exports = mailSender