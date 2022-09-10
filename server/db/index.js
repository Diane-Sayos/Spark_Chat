//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Journal = require('./models/Journal');
const Image = require('./models/Image');
const Message = require('./models/Message');
//associations could go here!
User.hasMany(Journal);
Journal.hasMany(Image);
Journal.belongsTo(User);
Image.belongsTo(Journal);
Message.belongsTo(User, { as: 'sender'}),
Message.belongsTo(User, { as: 'receiver'})

module.exports = {
  db,
  models: {
    User,
    Journal,
    Image,
    Message
  },
}
