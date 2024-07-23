const nodemailer = require('nodemailer')
require('dotenv').config()
const mailSender = nodemailer.createTransport(
  {
    service: 'gmail',
    secure :true,
    pool:true,
    auth: {
      user: "talent@vtsenterprisesindia.com",
      pass: "nqdahkmxgkbuumkk",
    },
  }
)

module.exports = mailSender