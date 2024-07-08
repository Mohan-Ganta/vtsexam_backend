const mailSender = require("../MailService/Mailservice")
const sendLoginCredentialsMail = async (name,email) => {
    const mailOptions = {
        from: 'tempabc70759@gmail.com',
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
      We are pleased to inform you that your registration for the recruitment drive at <strong>VTS Enterprises India Private Limited</strong> has been completed successfully.
    </p>
    <p>
      We appreciate your interest in participating in this drive. You will soon receive an email with your login details, including the link of Assessment and further instructions.
    </p>
    <p>
      The interview process will include the following stages:
    </p>
    <ul>
      <strong>
      <li>Aptitude Round</li>
      <li>Group Discussion (GD) or Coding Round</li>
      <li>Technical Round</li>
      <li>HR Round</li>
      </strong>
    </ul>
    <p>
      Please keep an eye on your inbox for the login details and additional updates.
    </p>
    <p>
      Thank you once again for your interest, and we wish you the best of luck in the upcoming process.
    </p>
    
  </div>
  <div style="padding:10px;margin-top:20px;">
  <p>
      Best Regards,
    </p>
    <p>
      HR Team,
    </p>
    <p>
      <strong>VTS Enterprises India Private Limited</strong>
    </p>
    
    <p>
      <i>
        This is an automated message. Please do not reply to this email.
      </i>
    </p>
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