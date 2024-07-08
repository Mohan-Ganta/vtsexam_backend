const express = require("express")
const cors = require("cors")
const adminRoutes = require('./Routes/Admin/adminRoutes')
const userRuoutes = require('./Routes/User/userRoutes')
const sendMail = require('./Service/MailService/RegistrationMail')
const app = express()
require('dotenv').config()
app.use(cors())
app.use(express.json());
app.use('/admin',adminRoutes)
app.use('/candidates',userRuoutes)
app.get('/sendmail',async (req,res)=>{
   await  sendMail("Kotesh","tempabc70759@gmail.com")
   res.send("mail sent bhayya")
})
app.listen(5000,()=>{
    console.log("Server is running at port 5000")
})
