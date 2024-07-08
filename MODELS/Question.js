const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Question = sequelize.define('question', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Image : {
        type: DataTypes.TEXT('long'),
        defaultValue: null
    },  
    Questions: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    Opts: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    Solution: {
        type: DataTypes.TEXT('long'),
        defaultValue: null
    },
    Answer: {
        type: DataTypes.TEXT('long'),
        defaultValue: null
    }
});


module.exports = Question;

