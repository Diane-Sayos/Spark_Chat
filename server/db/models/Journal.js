const Sequelize = require('sequelize')
const db = require('../db')
//will have userId
const Journal = db.define('journal', {
    title: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.DataTypes.NOW
    },
    description: {
        type: Sequelize.TEXT
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});
module.exports = Journal;
//may have multiple images