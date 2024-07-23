const nodemailer = require('nodemailer')
require('dotenv').config()
const mailSender = nodemailer.createTransport(
  {
    service: 'gmail',
    secure :true,
    pool:true,
    auth: {
      user: "techteam@vtsenterprisesindia.com",
      pass: "pftqlpjwbltcsyud",
    },
  }
)

module.exports = mailSender