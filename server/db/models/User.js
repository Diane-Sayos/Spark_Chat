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
//get all journals
User.prototype.getJournals = async function(){
  let journals = await db.models.journal.findAll({
    include: [{model: db.models.image}, {model: User}],
    order: [['date', 'DESC']]

  });
  return journals;
};
User.prototype.getJournal = async function(journalBody){
  let journal = await db.models.journal.findOne({
    where: {
      id: journalBody.id,
      userId: this.id
    },
    include: [{model: db.models.image},{model: User}]
  });
  return journal;
}
//create a journal without image
User.prototype.addJournal = async function(journal){
  journal = await db.models.journal.create(journal);
  return this.getJournal(journal);
};
//update journal
User.prototype.updateJournal = async function(journalBody, id){
  let journal = await db.models.journal.findOne({
    where: {
      id: id*1,
      userId: this.id
    }
  })
  if(journal){
    journal = await journal.update(journalBody);
  }
  return this.getJournal(journal);
}
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
User.prototype.updateUser = async function(data){
  const user = await User.findByPk(this.id);
  return (user.update(data));
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
