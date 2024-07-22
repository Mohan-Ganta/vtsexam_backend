const mailSender = require("./Mailservice")

async function sendAssessmentEmail(candidateName, college_Id, assessmentLink, generatedPassword,email) {
   

    let info = await mailSender.sendMail({
        from: 'tempabc70759@gmail.com',
        to: email,
        subject: 'Your Assessment Login Details',
        html: `
        <div>
        <img
    style="width:100%;height:auto;margin-bottom:4px"
    src="https://res.cloudinary.com/dvmkt80vc/image/upload/v1718889255/vts-banner-img_cwfluq.png"
    alt="vts-banner-image"
  ></img>
            <p>Hello ${candidateName},</p>
<p>Thank you for choosing VTS Enterprises India Private Limited. We are pleased to inform you that upon your successful registration for our recruitment drive, you are now ready to take the assessment.</p>
<p>Here are your login details for the assessment portal:</p>
<ul>
    <li>Username: <strong>${college_Id}</strong></li>
    <li>Password: <strong>${generatedPassword} </strong></li>
</ul>
<p>Please click the link below to access your assessment:</p>
<a href="${assessmentLink}">Assessment Link</a>

<p><strong>Instructions:</strong></p>
<ol>
    <li>Ensure you have a stable internet and power connection. Any interruptions during the exam may lead to the termination of the assessment.</li>
    <li>The assessment can only be taken on a desktop or a laptop.</li>
    <li>Tab switching is not allowed. Any attempts to switch tabs will not be tolerated and may lead to the termination of the assessment.</li>
    
</ol>
<p>Wishing you the best of luck,</p>
<p>HR Team<br>
<strong>VTS Enterprises India Private Limited </strong></p>

<p>This is an automated message. Please do not reply to this mail.</p>
</div>

        `, 
    });

    console.log('Message sent: %s', info);
}


module.exports = sendAssessmentEmail