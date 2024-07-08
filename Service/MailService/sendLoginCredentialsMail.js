const mailSender = require("./Mailservice")

async function sendAssessmentEmail(candidateName, candidateEmail, assessmentLink, generatedPassword) {
   

    let info = await mailSender.sendMail({
        from: '"Assessment Portal" <your-email@example.com>',
        to: "tempabc70759@gmail.com",
        subject: 'Your Assessment Login Details',
        html: `
            <p>Hello ${candidateName},</p>
            <p>Here are your login details for the assessment portal:</p>
            <ul>
                <li>Email: ${candidateEmail}</li>
                <li>Password: ${generatedPassword} <span class="copy-icon" onclick="copyPassword('${generatedPassword}')">📋</span></li>
            </ul>
            <p>Please click the link below to access your assessment:</p>
            <a href="${assessmentLink}">Assessment Link</a>
            <p>Thank you!</p>
            <script>
                function copyPassword(password) {
                    const el = document.createElement('textarea');
                    el.value = password;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                    alert('Password copied to clipboard!');
                }
            </script>
        `, 
    });

    console.log('Message sent: %s', info);
}


module.exports = sendAssessmentEmail