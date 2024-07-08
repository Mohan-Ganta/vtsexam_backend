const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const connection = require('../../dbConnection');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const crypto = require('crypto');
const sendLoginCredentialsMail = require('../../Service/MailService/sendLoginCredentialsMail');

const { send } = require('process');

const generateRandomPassword = (length) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};


router.post('/assessments', async (req, res) => {
  const { name, drivedate } = req.body;
  console.log(name,drivedate)
  const formattedDate = new Date(drivedate).toISOString().split('T')[0];

  const query1 = 'CREATE TABLE IF NOT EXISTS assessmentids (assessmentid VARCHAR(255), name VARCHAR(255), drivedate DATE, students VARCHAR(255))';
  await connection.query(query1);

  const [latestAssessmentId] = await connection.query('SELECT * FROM assessmentids ORDER BY assessmentid DESC LIMIT 1');

  let newAssessmentId = "VTSAS0001";

  if (latestAssessmentId && latestAssessmentId.length > 0) {
    const assessment = latestAssessmentId[0].assessmentid;
    const numericPart = assessment.match(/\d+/g).join('');
    const currentId = parseInt(numericPart, 10);
    const newId = currentId + 1;
    newAssessmentId = `VTSAS${String(newId).padStart(4, '0')}`;
  }

  const query3 = 'INSERT INTO assessmentids (assessmentid, name, drivedate, students) VALUES (?, ?, ?, ?)';
  await connection.query(query3, [newAssessmentId, name, formattedDate, 0]);

  res.status(201).json({
    assessmentid: newAssessmentId,
    name: name,
    drivedate: formattedDate
  });
});


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

const getStudentData = async (email)=>{
  const searchQuery = 'SELECT * FROM user WHERE email=?'
  const [result] = await connection.query(searchQuery,[email])
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
  const {studentData} = req.body
  const assessmentLink = `http://localhost:3000/vts-assessment/${req.params.id}/login`
  for(var i =0;i<studentData.length;i++)
  {
    const email = studentData[i].email
    console.log("Email received.....................",email)
    const data = await getStudentData(email)
    console.log("data of the student ..................",data[0])
    const name = data[0].fullname
    const pwd = data[0].randomPassword
    const college_Id = data[0].college_Id
    await sendLoginCredentialsMail(name,college_Id,assessmentLink,pwd,email)
    .then(res=>console.log("email sent to " , name))
    .catch(err=>console.log("error sending mail"))

  }
  console.log("hogaya")
  
    

  

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

router.get("/:assessmentId/getQuestions",async (req,res)=>{
  const qnQuery = 'SELECT * FROM question WHERE assessmentId = ?'
  const [questions] = await connection.query(qnQuery,[req.params.assessmentId])
  res.status(200).json(questions)
})

router.get("/:assessmentId/getreports",async (req,res)=>{
  const reportsQuery = `SELECT * FROM results WHERE assessmentId = ?`
  const [results] = await connection.query(reportsQuery,[req.params.assessmentId])
  res.status(200).json(results)
})
module.exports = router;