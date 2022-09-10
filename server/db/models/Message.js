const Sequelize = require('sequelize')
const db = require('../db')
//will have senderId, receiverId
const Message = db.define('message', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        get: function (){
            return this.getDataValue('date')
            .toLocaleString('en-US');
        }
    }
});
module.exports = Message;