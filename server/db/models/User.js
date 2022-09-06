const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const SALT_ROUNDS = 5;
const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  image: {
    type: Sequelize.TEXT
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get: function(){
      return `${this.firstName} ${this.lastName}`;
    }
  }
})

module.exports = User

/** 
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}
// //get all public journals set to public including users
// User.prototype.getPublicJournals = async function(){
//   const publicJournals = await db.models.journal.findAll({
//     where: {
//       isPrivate: false
//     },
//     include: User
//   })
//   return publicJournals;
// };
//get all journals owned by user
User.prototype.getJournals = async function(){
  let journals = await db.models.journal.findAll({
    where: {
      isPrivate: false
    },
    include: [{model: db.models.image}, {model: User}]
  });
  return journals;
};
//create a journal without image
User.prototype.addJournal = async function(journal){
  return (await db.models.journal.create(journal));
};
//get all images
User.prototype.getImages = async function(){
  let images = await db.models.image.findAll()
  return images;
};
//add an image
User.prototype.addImage = async function(image){
  return (await db.models.image.create(image));
};
//delete image
User.prototype.deleteImage = async function(id){
  image = await db.models.image.findByPk(id*1);
  image.destroy();
};

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
