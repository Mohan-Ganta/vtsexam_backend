const nodemailer = require('nodemailer');

async function sendAssessmentEmail(candidateName, candidateEmail, assessmentLink, generatedPassword) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.example.com', 
        port: 587,
        secure: false,
        auth: {
            user: 'your-email@example.com', 
            pass: 'your-password' 
        },
    });

    let info = await transporter.sendMail({
        from: '"Assessment Portal" <your-email@example.com>', // sender address
        to: candidateEmail, // list of receivers
        subject: 'Your Assessment Login Details', // Subject line
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
        `, // html body
    });

    console.log('Message sent: %s', info.messageId);
}

const candidateName = 'John Doe';
const candidateEmail = 'john.doe@example.com';
const assessmentLink = 'http://your-assessment-link.com';
const generatedPassword = 'randomGeneratedPassword';

sendAssessmentEmail(candidateName, candidateEmail, assessmentLink, generatedPassword)
    .catch(console.error);
