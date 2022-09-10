const Sequelize = require('sequelize')
const db = require('../db')
//will have userId
//may have multiple images

const Journal = db.define('journal', {
    title: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE,
        get: function() {
            return this.getDataValue('date')
              .toLocaleString('en-US');
        }
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