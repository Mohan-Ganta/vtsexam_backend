const mailSender = require("../MailService/Mailservice")

const sendMalpracticeMail = async (email,name) => {
    const mailOptions = {
        from: 'techteam@vtsenterprisesindia.com',
        to: email,
        subject: 'Notification of Test Submission!!!',
        html: `
      <div style="width:100%;max-width:600px;margin:0 auto;padding:20px;border:1px solid #ccc;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);font-family:Arial,sans-serif;line-height:1.6;">
        <div style="text-align:center;margin-bottom:20px;">
          <img src="https://res.cloudinary.com/dvmkt80vc/image/upload/v1720537847/WhatsApp_Image_2024-07-09_at_8.34.38_PM_xtzvwx.jpg" alt="vts-banner-image" style="width:100%;height:auto;margin-bottom:4px;">
        </div>
        <div style="margin-bottom:20px;">
          <p>Dear Candidate,</p>
          <p>We regret to inform you that your test was submitted due to <strong style="color:red">Malpractice</strong>.</p>
          <p>Despite receiving alerts regarding malpractice, the issue persisted, leading to the automatic submission of your test. Our monitoring system identified multiple infractions, including:</p>
          <ul style="list-style-type:none;padding:0;">
            <li style="background:#f9f9f9;margin:5px 0;padding:5px;border-radius:5px;">• Failure to complete the test within the allotted time.</li>
            <li style="background:#f9f9f9;margin:5px 0;padding:5px;border-radius:5px;">• Attempting to use Ctrl+C.</li>
            <li style="background:#f9f9f9;margin:5px 0;padding:5px;border-radius:5px;">• Attempting to switch tabs during the test.</li>
          </ul>
          <strong><p>Disclaimer:</p></strong>
          <ul style="padding-left:20px;">
            <li><strong>If your test is submitted due to any other reasons like power failure, hardware failure, unexpected restart, or any reason other than the above, please contact the team immediately.</strong></li>
          </ul>
          <div style="padding:10px;margin-top:5px;">
            <p>Thank you for your understanding and cooperation.</p>
            <p>Best Regards,</p>
            <p>HR Team,</p>
            <p><strong>VTS Enterprises India Private Limited</strong></p>
            <p style="font-size:12px;"><i>This is an automated message. Please do not reply to this email.</i></p>
          </div>
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