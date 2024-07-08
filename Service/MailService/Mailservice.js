const nodemailer = require('nodemailer')
const mailSender = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: 'techteam@vtsenterprisesindia.com',
      pass: 'rsojdzacxacpdmeh',
    },
  }
)

module.exports = mailSender