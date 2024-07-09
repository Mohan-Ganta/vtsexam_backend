const nodemailer = require('nodemailer')
require('dotenv').config()
const mailSender = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: "techteam@vtsenterprisesindia.com",
      pass: "avvkbeinyfvclczk",
    },
  }
)

module.exports = mailSender