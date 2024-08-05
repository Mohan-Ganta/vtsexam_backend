const express = require("express")
const cors = require("cors")
const adminRoutes = require('./Routes/Admin/adminRoutes')
const userRuoutes = require('./Routes/User/userRoutes')
const sendSuccessfulRegMail = require('./Service/MailService/RegistrationMail')
const sendLoginDetails = require("./Service/MailService/sendLoginCredentialsMail")
const app = express()
require('dotenv').config()
app.use(cors())
app.use(express.json());
app.use('/admin',adminRoutes)
app.use('/candidates',userRuoutes)
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS is working' });
  });
app.get('/sendmail',async (req,res)=>{
    const assessmentLink = `${process.env.TEST_LINK}/vts-drive2025/VTSAS0001/20KD1A05D1/650c2f2d`
    // await sendSuccessfulRegMail("gantamohan.556@gmail.com",assessmentLink);
    await sendSuccessfulRegMail("Kotesh","tempabc70759@gmail.com",assessmentLink);
    // await sendLoginDetails("kotesh","1235","www.google.com","abcdpassword","tempabc70759@gmail.com")
    res.send("mail sent")
})



app.get("/",(req,res)=>{
    res.send("Hello from Backend")
})
app.listen(5000,()=>{
    console.log("Server is running at port 5000")
})
