const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const AssessmentIds = sequelize.define('assessmentids', {
    AssessmentId: {
        type: DataTypes.TEXT('long'),
        primaryKey: true
    }
});



module.exports = AssessmentIds