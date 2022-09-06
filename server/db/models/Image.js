const Sequelize = require('sequelize')
const db = require('../db')
//will have userId, journalId
const Image = db.define('image', {
    imageUrl: {
        type: Sequelize.TEXT
    }
});
module.exports = Image;