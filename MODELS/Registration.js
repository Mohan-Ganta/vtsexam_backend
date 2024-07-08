const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Registration = sequelize.define('registration', {
    fullname: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    email: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    randomPassword: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    college_Id: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    college_name: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    course: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    dept: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    cgpa: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    assessmentId: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    drivedate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    questions: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    attemptedquestions: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    correct: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    incorrect: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    },
    score: {
        type: DataTypes.VARCHAR(255),
        allowNull: false
    }
});


module.exports = Registration;

