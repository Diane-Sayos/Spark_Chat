//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Journal = require('./models/Journal');
const Image = require('./models/Image');
//associations could go here!
User.hasMany(Journal);
User.hasMany(Image);
Journal.hasMany(Image);
Journal.belongsTo(User);


module.exports = {
  db,
  models: {
    User,
    Journal,
    Image
  },
}
