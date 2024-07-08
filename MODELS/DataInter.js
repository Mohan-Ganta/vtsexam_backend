const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const { JSON } = require('body-parser');


const DataInterpretation = sequelize.define('datainterpretation', {
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
    Options: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    Solution: {
        type: DataTypes.TEXT('long'),
        defaultValue: null
    }
});


module.exports = DataInterpretation;

