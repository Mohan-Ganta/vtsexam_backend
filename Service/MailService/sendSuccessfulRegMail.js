const mailSender = require("../MailService/Mailservice")


const sendMalpracticeMail = async (email,name) => {
    const mailOptions = {
        from: '"techteam@vtsenterprisesindia.com',
        to: email,
        subject: 'Test Submission Successful',
        html: `
      <div style="width:100%;max-width:600px;margin:0 auto;padding:20px;border:1px solid #ccc;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);font-family:Arial,sans-serif;line-height:1.6;">
        <div style="text-align:center;margin-bottom:20px;">
          <img src="https://res.cloudinary.com/dvmkt80vc/image/upload/v1720537847/WhatsApp_Image_2024-07-09_at_8.34.38_PM_xtzvwx.jpg" alt="VTS Banner Image" style="width:100%;height:auto;margin-bottom:4px;">
        </div>
        <div style="margin-bottom:20px;">
          <p>Dear ${name},</p>
          <p>Thank you for submitting your test.<p style="color:green">Test Submitted Successfully.</p></p>
          <p>We appreciate your effort and dedication. Keep up the good work!</p>
          <p>If you have any questions or need further assistance, please contact our support team.</p>
          <p>Thank you,</p>
          <p>HR Team</p>
          <p><strong>VTS Enterprises India Private Limited</strong></p>
          <p style="font-size:12px;"><i>This is an automated message. Please do not reply to this email.</i></p>
        </div>
      </div>
        `,
    };

    try {
        let info = await mailSender.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

module.exports = sendMalpracticeMail;