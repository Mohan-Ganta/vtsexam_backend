const mailSender = require("../MailService/Mailservice")
const sendLoginCredentialsMail = async (name,email) => {
    const mailOptions = {
        from: 'techteam@vtsenterprisesindia.com',
        to: email,
        subject: 'Successful Registration for Recruitment Drive at VTS Enterprises India Private Limited',
        html: `
           <div>
  <img
    style="width:100%;height:auto;margin-bottom:4px"
    src="https://res.cloudinary.com/dvmkt80vc/image/upload/v1718889255/vts-banner-img_cwfluq.png"
    alt="vts-banner-image"
  ></img>
  <h1>Successful Registration for Recruitment Drive at VTS Enterprises India Private Limited</h1>
  <div>
    <p>
      Dear ${name},
    </p>
    <p>
      Thank you for choosing <strong>VTS Enterprises India Private Limited</strong>. We are delighted to inform you that you have successfully registered for our <strong>Recruitment Drive</strong>.
    </p>
    <h3>Next Steps:</h3>
    <p>
      You will soon receive an email containing:
    </p>
    <ul>
      <li><strong>Assessment Link</strong></li>
      <li><strong>Login Credentials</strong></li>
      <li><strong>Exam Instructions</strong></li>
    </ul>
    <h3>Recruitment Process Rounds:</h3>
    <ol>
      <li><strong>Aptitude Round</strong></li>
      <li><strong>Group Discussion or Coding Round</strong></li>
      <li><strong>Technical Round</strong></li>
      <li><strong>HR Round</strong></li>
    </ol>
    <h3>Important Actions:</h3>
    <ul>
      <li><strong>Check your email regularly</strong> for further instructions and updates.</li>
      <li>For any technical issues or questions regarding the assessment, contact us at <strong>blahblahblah@gmail.com</strong>.</li>
    </ul>
    <h3>Learn More About Us:</h3>
    <p>
      Visit our website: <a href="http://vtsenterprisesindia.com">vtsenterprisesindia.com</a>
    </p>
  </div>
  <div style="padding:10px;margin-top:20px;">
    <p>Best regards,</p>
    <p>HR Team,</p>
    <p><strong>VTS Enterprises India Private Limited</strong></p>
    <p><i>This is an automated message. Please do not reply to this email.</i></p>
  </div>
</div>

        `,
    };

    try {
        let info = await mailSender.sendMail(mailOptions);
        console.log("Registration Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

module.exports = sendLoginCredentialsMail;