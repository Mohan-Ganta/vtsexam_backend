const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Verbal = sequelize.define('verbal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Comprehension: {
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


module.exports = Verbal;

