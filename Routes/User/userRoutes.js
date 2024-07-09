const express = require('express');
const router = express.Router();
const connection = require('../../dbConnection');
const crypto = require('crypto');
const sendSuccessfulRegMail = require("../../Service/MailService/RegistrationMail");

const generateRandomPassword = (length) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

router.get('/getregistrations/:assessmentId', async (req, res) => {
    try {
        const assessmentId = req.params.assessmentId;
        const query = 'SELECT * FROM user WHERE assessmentId = ?';
        const [users] = await connection.query(query, [assessmentId]);

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});


router.post('/:assessmentId/registrations', async (req, res) => {
    try {
        console.log(req.body);
        const assessmentId = req.params.assessmentId;
        const { fullname, email, phone, college_Id, college_name, course, dept, cgpa } = req.body;
        const randomPassword = generateRandomPassword(8);

        const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                assessmentId VARCHAR(255),
                fullname VARCHAR(255),
                email VARCHAR(255),
                randomPassword VARCHAR(8),
                phone VARCHAR(255),
                college_Id VARCHAR(255),
                college_name VARCHAR(255),
                course VARCHAR(255),
                dept VARCHAR(255),
                cgpa VARCHAR(255),
                login_state BOOLEAN DEFAULT FALSE
            )
        `;

        await connection.query(createUserTableQuery);

        const existingUserQuery = 'SELECT * FROM user WHERE email = ?';
        const [existingUser] = await connection.query(existingUserQuery, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const insertUserQuery = `
            INSERT INTO user (
                assessmentId, fullname, email, randomPassword, phone, college_Id, college_name, course, dept, cgpa
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const results = await connection.query(insertUserQuery, [assessmentId, fullname, email, randomPassword, phone, college_Id, college_name, course, dept, cgpa]);

        const assessmentLink = `${process.env.BASE_URL}/vts-drive2025/${assessmentId}/${college_Id}/${randomPassword}`
        await sendSuccessfulRegMail(email,assessmentLink);
        console.log()
        res.status(200).json({ message: 'Successfully inserted data', results, randomPassword });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Error inserting data' });
    }
});
const checkLoginTime = (req, res, next) => {
    const loginStartTime = new Date();
    loginStartTime.setHours(10, 0, 0);
    const loginEndTime = new Date();
    loginEndTime.setHours(11, 0, 0);

    const currentTime = new Date();
    if (currentTime >= loginStartTime && currentTime <= loginEndTime) {
        next();
    } else if (currentTime < loginStartTime) {
        res.status(403).json({ error: 'Assesment has not Started yet!Try after Sometime' });
    } else {
        res.status(403).json({ error: 'Assessment has already started.' });
    }
};

router.get('/:assessmentId/:stdId/getdetails',async (req,res)=>{
    const assessmentId = req.params.assessmentId
    const college_Id = req.params.stdId
    const query = 'SELECT * FROM user WHERE college_Id = ? AND assessmentId = ?';
    const [user] = await connection.query(query, [college_Id, assessmentId]);
    res.json(user)
})


router.post('/:assessmentId/login', async (req, res) => {
    try {
        const { college_Id, password } = req.body;
        console.log(req.body)
        const assessmentId = req.params.assessmentId;
        const query = 'SELECT * FROM user WHERE college_Id = ? AND randomPassword = ?';
        const [user] = await connection.query(query, [college_Id, password]);

        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (user[0].login_state) {
            return res.status(403).json({ error: 'Multiple logins are not encouraged' });
        }

        const updateQuery = 'UPDATE user SET login_state = TRUE WHERE id = ?';
        await connection.query(updateQuery, [user[0].id]);

        res.status(200).json({ message: 'Login successful', user: user[0] });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

router.post('/:assessmentId/results', async (req, res) => {
    try {
        console.log(req.body);
        const assessmentId = req.params.assessmentId;
        const { name, collegeId, collegeName, score, attempted, unattempted, correct, incorrect, email, phoneNumber } = req.body;

        const createResultsTableQuery = `
            CREATE TABLE IF NOT EXISTS results (
                id INT AUTO_INCREMENT PRIMARY KEY,
                assessmentId VARCHAR(255),
                name VARCHAR(255),
                collegeId VARCHAR(255),
                collegeName VARCHAR(255),
                score INT,
                attempted INT,
                unattempted INT,
                correct INT,
                incorrect INT,
                email VARCHAR(255),
                phoneNumber VARCHAR(255)
            )
        `;

        await connection.query(createResultsTableQuery);

        const insertResultQuery = `
            INSERT INTO results (
                assessmentId, name, collegeId, collegeName, score, attempted, unattempted, correct, incorrect, email, phoneNumber
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const results = await connection.query(insertResultQuery, [assessmentId, name, collegeId, collegeName, score, attempted, unattempted, correct, incorrect, email, phoneNumber]);

        res.status(200).json({ message: 'Successfully inserted results', results });
    } catch (error) {
        console.error('Error inserting results:', error);
        res.status(500).json({ error: 'Error inserting results' });
    }
});

module.exports = router;
