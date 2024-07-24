const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const connection = require('../../dbConnection');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const crypto = require('crypto');
// const sendLoginCredentialsMail = require('../../Service/MailService/sendLoginCredentialsMail');
const sendAssessmentEmailtoStudent = require('../../Service/MailService/RegistrationMail')
const newRegistrationMailtoStudent = require('../../Service/MailService/NewRegistrationMail')
const sendalertMailtostd = require('../../Service/MailService/submissionAlertMail')
const sendSuccessfulSubmissionMail = require("../../Service/MailService/sendSuccessfulRegMail")
const { send } = require('process');

const generateRandomPassword = (length) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};


router.post("/sendnewregmail",async(req,res)=>{
  const {mail,reglink} = req.body
  await newRegistrationMailtoStudent(mail,reglink)
  .then(resp=>res.send("Reg Link Mail sent"))
  .catch(err=>res.send(err))
})
router.post('/sendalertmail',async(req,res)=>{
  const {name,mail} = req.body
  await sendalertMailtostd(mail,name)
  .then(()=>res.send("MalPractice Mail sent Successfully"))
  .catch((err)=>res.send(err))
})
router.post('/sendsuccessfulsubmissionmail',async(req,res)=>{
  const {name,mail} = req.body
  await sendalertMailtostd(mail,name)
  .then(()=>console.log("MalPractice Mail sent Successfully"))
  .catch((err)=>console.log(err))
})

// router.post('/assessments', async (req, res) => {
//   const { name, drivedate } = req.body;
//   console.log(name,drivedate)
//   const formattedDate = new Date(drivedate).toISOString().split('T')[0];

//   const query1 = 'CREATE TABLE IF NOT EXISTS assessmentids (assessmentid VARCHAR(255), name VARCHAR(255), drivedate DATE, students VARCHAR(255))';
//   await connection.query(query1);

//   const [latestAssessmentId] = await connection.query('SELECT * FROM assessmentids ORDER BY assessmentid DESC LIMIT 1');

//   let newAssessmentId = "VTSAS0001";

//   if (latestAssessmentId && latestAssessmentId.length > 0) {
//     const assessment = latestAssessmentId[0].assessmentid;
//     const numericPart = assessment.match(/\d+/g).join('');
//     const currentId = parseInt(numericPart, 10);
//     const newId = currentId + 1;
//     newAssessmentId = `VTSAS${String(newId).padStart(4, '0')}`;
//   }

//   const query3 = 'INSERT INTO assessmentids (assessmentid, name, drivedate, students) VALUES (?, ?, ?, ?)';
//   await connection.query(query3, [newAssessmentId, name, formattedDate, 0]);

//   res.status(201).json({
//     assessmentid: newAssessmentId,
//     name: name,
//     drivedate: formattedDate
//   });
// });


//----------------------------registration by excel sheet-------------------------------------



router.post('/:assessmentId/usersregistration', upload.single('file'), async (req, res) => {
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const users = xlsx.utils.sheet_to_json(worksheet);

  try {
    connection.query('BEGIN');

    // const [latestAsessmentId] = await connection.query('SELECT * FROM assessmentids ORDER BY assessmentid DESC LIMIT 1');
    // const assessmentId = latestAsessmentId[0].assessmentid;
    // const driveDate = latestAsessmentId[0].drivedate;
    // const randomPassword = generateRandomPassword(8);

    //const query1 = 'INSERT INTO registration (fullname,email,randomPassword,phone,college_Id,college_name,course,dept,cgpa,assessmentId, drivedate,questions,attemptedquestions,correct,incorrect,score) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    for (var i = 0; i < users.length; i++) {
      const user = users[i];
      const { Reg_Id, Name, Student_Email, Course, Department, Gender, Phone, cgpa } = user;
      const assessmentId = req.params.assessmentId
      const randomPassword = generateRandomPassword(8);
      const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                assessmentId VARCHAR(255),
                fullname VARCHAR(255),
                email VARCHAR(255),
                gender VARCHAR(255),
                randomPassword VARCHAR(8),
                phone VARCHAR(255) DEFAULT NULL,
                college_Id VARCHAR(255),
                college_name VARCHAR(255),
                course VARCHAR(255) DEFAULT NULL,
                dept VARCHAR(255),
                cgpa VARCHAR(255) DEFAULT NULL,
                login_state BOOLEAN DEFAULT FALSE
            )
        `;

      await connection.query(createUserTableQuery);
      // const query1 = 'INSERT INTO user (Reg_Id,Name,randomPassword,Student_Email,Department) VALUES (?,?,?,?,?)';
      // const results = await connection.query(query1,[Reg_Id,Name,randomPassword,Student_Email,Department]);
      const insertUserQuery = `
        INSERT INTO user (
            assessmentId, fullname,email,gender , randomPassword, phone ,college_Id, college_name,course, dept,cgpa ,login_state
        ) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)
    `;
      const results = await connection.query(insertUserQuery, [assessmentId, Name, Student_Email, Gender, randomPassword, Phone, Reg_Id, "KSR COLLEGE", Course, Department, cgpa, false]);
      console.log(results);
    }
    connection.query('COMMIT');
    res.status(201).send("Successfully inserted data");

  } catch (error) {
    console.error('Error inserting data:', error);
    await connection.query('ROLLBACK');
    res.status(500).send('Error inserting data');
  }
});

router.post("/:assessmentId/:stId/resettest",async(req,res)=>{
  const assessmentId = req.params.assessmentId 
  const stdId = req.params.stId
  const searchStudent = `SELECT * FROM user WHERE college_Id = ? AND assessmentId = ?;`
  const [user] = await connection.query(searchStudent,[stdId,assessmentId])
  console.log(user)
  if(user.length==0)
    res.status(404).send("Student ID doesn't exist!")
  else{
    const query = `UPDATE user SET login_state = '0' WHERE college_Id = ? AND assessmentId = ?;`
    const deleteResult = `DELETE FROM results WHERE assessmentId = ? AND collegeId = ?;`
    const [result ] = await connection.query(deleteResult,[assessmentId,stdId])
    console.log(result)
    await connection.query(query,[stdId,assessmentId])
    .then(response=>res.send("Test reset Successful"))
    .catch(err=>res.send(err))
  }
  
})




router.post('/assessments', async (req, res) => {
  const { name, drivedate } = req.body;
  console.log(name, drivedate);
  const formattedDate = new Date(drivedate).toISOString().split('T')[0];

  const query1 = 'CREATE TABLE IF NOT EXISTS assessmentids (assessmentid VARCHAR(255), name VARCHAR(255), drivedate DATE, students VARCHAR(255))';
  await connection.query(query1);

  const [latestAssessmentId] = await connection.query('SELECT * FROM assessmentids ORDER BY assessmentid DESC LIMIT 1');

  let newAssessmentId = "KLUA1";

  if (latestAssessmentId && latestAssessmentId.length > 0) {
    const assessment = latestAssessmentId[0].assessmentid;
    const numericPart = assessment.match(/\d+/g).join('');
    const currentId = parseInt(numericPart, 10);
    const newId = currentId + 1;
    newAssessmentId = `KLUA${newId}`;
  }

  const query3 = 'INSERT INTO assessmentids (assessmentid, name, drivedate, students) VALUES (?, ?, ?, ?)';
  await connection.query(query3, [newAssessmentId, name, formattedDate, 0]);

  res.status(201).json({
    assessmentid: newAssessmentId,
    name: name,
    drivedate: formattedDate
  });
});
router.post('/')
router.post('/:assessmentId/uploadquestions', upload.single('file'), async (req, res) => {
  const assessmentId = req.params.assessmentId;
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const questions = xlsx.utils.sheet_to_json(worksheet);

  try {
    await createQuestionTableIfNotExists();

    await connection.query('BEGIN');

    const query = 'INSERT INTO question (assessmentId, Image, Questions, Opts, Solution,Answer) VALUES (?, ?, ?, ?, ?,?)';
    for (let i = 0; i < questions.length; i++) {
      const options = JSON.stringify({
        1: questions[i][1],
        2: questions[i][2],
        3: questions[i][3],
        4: questions[i][4]
      });

      const result = await connection.query(query, [
        assessmentId,
        questions[i].Image,
        questions[i].Questions,
        options,
        questions[i].Solution,
        null
      ]);
      console.log(`Inserted question ${i + 1}: ${result.insertId}`);
    }

    await connection.query('COMMIT');

    res.status(201).send(`Successfully inserted data`);
  } catch (error) {
    console.error('Error inserting data:', error);
    await connection.query('ROLLBACK');
    res.status(500).send('Error inserting data');
  }
});


async function createQuestionTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS question (
      id INT AUTO_INCREMENT PRIMARY KEY,
      assessmentId VARCHAR(255) NOT NULL,
      Image VARCHAR(255),
      Questions TEXT DEFAULT NULL,
      Opts TEXT,
      Solution TEXT NOT NULL,
      Answer VARCHAR(255) DEFAULT NULL
    )`;

  try {
    await connection.query(createTableQuery);
    console.log('question table created or already exists');
  } catch (error) {
    console.error('Error creating question table:', error);
    throw error;
  }
}

const getStudentData = async (email) => {
  const searchQuery = 'SELECT * FROM user WHERE email=?'
  const [result] = await connection.query(searchQuery, [email])
  return result
}
router.post('/:id/startassessment', async (req, res) => {
  // const currentTime = new Date();
  // const targetTime = new Date();
  // targetTime.setHours(21, 34, 0, 0);
  // console.log(currentTime)
  // console.log(targetTime)
  // if (currentTime >= targetTime) {
  //   targetTime.setDate(targetTime.getDate() + 1);
  // }
  // const delay = targetTime - currentTime;
  // console.log(`exam will start after ${delay}`)

  // const scheduleTask = async () => {
  //   try {
  //     console.log("Assesment is started");
  //     res.send('Assessment started and questions have been sent.');
  //   } catch (error) {
  //     console.error('Error starting assessment:', error);
  //     res.status(500).send('Error starting assessment');
  //   }
  // };

  // setTimeout(scheduleTask, delay);
  const { studentData } = req.body
  for (var i = 0; i < studentData.length; i++) {
    const email = studentData[i].email
    const data = await getStudentData(email)
    const name = data[0].fullname

    const assessmentLink = `${process.env.BASE_URL}/vts-drive2025/${req.params.id}/${data[0].college_Id}/${data[0].randomPassword}`
    await sendAssessmentEmailtoStudent(name, email, assessmentLink)
      .then(res => console.log(`${i + 1}. email sent to`, name))
      .catch(err => console.log("error sending mail"))
  }


});
router.get('/getassessments', async (req, res) => {
  try {
    const [assessments] = await connection.query('SELECT * FROM assessmentids');
    res.status(200).json(assessments);
  } catch (error) {
    console.error('Error retrieving assessments:', error);
    res.status(500).send('Error retrieving assessments');
  }
});
router.get('/:assessmentId/start-time', async (req, res) => {
  const { assessmentId } = req.params;
  try {
    const [assessment] = await connection.query('SELECT drivedate FROM assessmentids WHERE assessmentid = ?', [assessmentId]);
    if (assessment.length === 0) {
      return res.status(404).send('Assessment not found');
    }
    res.status(200).json({ startTime: assessment[0].drivedate });
  } catch (error) {
    console.error('Error retrieving start time:', error);
    res.status(500).send('Error retrieving start time');
  }
});
router.get("/:assessmentId/getQuestions", async (req, res) => {
  const qnQuery = 'SELECT * FROM question WHERE assessmentId = ?'
  const [questions] = await connection.query(qnQuery, [req.params.assessmentId])
  res.status(200).json(questions)
})

router.get("/:assessmentId/getreports", async (req, res) => {
  const reportsQuery = `SELECT * FROM results WHERE assessmentId = ?`
  const [results] = await connection.query(reportsQuery, [req.params.assessmentId])
  res.status(200).json(results)
})


router.post('/feedback', async (req, res) => {
  const { assessmentId, name, feedback, rating } = req.body
  const query1 = 'CREATE TABLE IF NOT EXISTS feedback (assessmentid VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, feedback TEXT DEFAULT NULL, rating VARCHAR(255) DEFAULT NULL)';
  await connection.query(query1);
  const query3 = 'INSERT INTO feedback (assessmentid, name, feedback, rating) VALUES (?, ?, ?, ?)';
  await connection.query(query3, [assessmentId, name, feedback, rating]);

  res.status(201).json("thank you");

})
module.exports = router;