const mailSender = require("../MailService/Mailservice")
const sendLoginCredentialsMail = async (email,assesmentLink) => {
    const mailOptions = {
        from: 'techteam@vtsenterprisesindia.com',
        to: email,
        subject: 'VTS Drive 2025 Batch Assessment Link !!!!',
        html: `

      <div style="width:100%;max-width:600px;margin:0 auto;padding:20px;border:1px solid #ccc;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);font-family:Arial,sans-serif;line-height:1.6;">
  <div style="text-align:center;margin-bottom:20px;">
    <img src="https://res.cloudinary.com/dvmkt80vc/image/upload/v1720537847/WhatsApp_Image_2024-07-09_at_8.34.38_PM_xtzvwx.jpg" alt="vts-banner-image" style="width:100%;height:auto;margin-bottom:4px;">
  </div>
  <div style="margin-bottom:20px;">
    <p>Dear Candidate,</p>
    <p>We appreciate your interest in participating in the VTS Drive. We are pleased to inform you that you have registered for DRIVE 2025. Please read this mail carefully for further process and instructions.</p>
    <p>The recruitment process will include the following rounds:</p>
    <ul style="list-style-type:none;padding:0;">
      <li style="background:#f9f9f9;margin:5px 0;padding:5px;border-radius:5px;">• Aptitude Round</li>
      <li style="background:#f9f9f9;margin:5px 0;padding:5px;border-radius:5px;">• Group Discussion or Coding Round</li>
      <li style="background:#f9f9f9;margin:5px 0;padding:5px;border-radius:5px;">• Technical Round</li>
      <li style="background:#f9f9f9;margin:5px 0;padding:5px;border-radius:5px;">• HR Round</li>
    </ul>
    <p>INSTRUCTIONS:</p>
    <ol style="padding-left:20px;">
      <li>The assessment link given below will redirect you to the assessment portal. The assessment link is unique for each individual and can only be accessed once.</li>
      <li>Please avoid any attempts to access the assessment link unless you are ready to give the assessment.</li>
      <li>Ensure you have a stable internet and power connection before accessing the assessment link. Any interruptions during the assessment may lead to the termination of the examination.</li>
      <li>Confirm your details before you start the exam.</li>
      <li>The assessment portal can only be accessed on a desktop or a laptop. Avoid using your phone to access the examination link.</li>
      <li>Tab switching and window switching is strictly not allowed. Any attempts to switch a tab or a window would not be tolerated and will further lead to the termination of the examination.</li>
      <li>The assessment consists of 60 questions and will include the following sections:</li>
    </ol>
    <ul style="list-style-type:none;padding:0;">
      <li style="background:#f9f9f9;margin:5px 30px;padding:6px;border-radius:5px;">• ARITHMETIC – 30 Questions</li>
      <li style="background:#f9f9f9;margin:5px 30px;padding:6px;border-radius:5px;">• LOGICAL – 15 Questions</li>
      <li style="background:#f9f9f9;margin:5px 30px;padding:6px;border-radius:5px;">• VERBAL – 15 Questions</li>
    </ul>
    <ol start="8" style="padding-left:20px;">
      <li>The student will have 60 minutes to answer the 60 questions. The examination will automatically be submitted after the given time expires.</li>
    </ol>
    <p style="color:red">⚠ DO NOT REFRESH THE PAGE !!!</p>
    <p style="background-color:yellow;"><strong>Assessment Link</strong> : <a href=${assesmentLink} >click here</a></p>
    <p>We wish you the best of luck. Stay calm, read each question carefully and give it your best effort. If you have any further queries or need assistance, contact us at <a href="mailto:talent@vtsenterprisesindia.com">talent@vtsenterprisesindia.com</a>.</p>
  </div>
  <div style="padding:10px;margin-top:20px;">
    <p>Best Regards,</p>
    <p>HR Team,</p>
    <p><strong>VTS Enterprises India Private Limited</strong></p>
    <p style="font-size:12px;"><i>This is an automated message. Please do not reply to this email.</i></p>
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