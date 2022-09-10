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



User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}
User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}
//********************************************************************************//
//get all journals
User.prototype.getJournals = async function(){
  let journals = await db.models.journal.findAll({
    include: [{model: db.models.image}, {model: User}],
    order: [['date', 'DESC']]
  });
  return journals;
};
//get specific journal
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
      id: id,
      userId: this.id
    }
  })
  if(journal){
    journal = await journal.update(journalBody);
  }
  return this.getJournal(journal);
};
//delete journal
User.prototype.deleteJournal = async function(journalId){
  let journal = await db.models.journal.findOne({
    where: {
      id: journalId,
      userId: this.id
    }
  });
  await journal.destroy();
}
//********************************************************************************//
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
  const image = await db.models.image.findByPk(id*1);
  image.destroy();
};
//********************************************************************************//
//get all messages
User.prototype.getMessages = async function(){
  let messages = await db.models.message.findAll({
    include: [{
      model: User,
      as: 'sender',
      include: [{
        model: db.models.image,
      }]
    },{
      model: User,
      as : 'receiver',
      include: [{
        model: db.models.image,
      }]
    }]
  })
  return messages;
};
//get specific message
User.prototype.getMessage = async function(messageBody){
  let message = await db.models.message.findOne({
    where: {
      id: messageBody.id
    },
    include: [{
      model: User,
      as: 'sender',
      include: [{
        model: db.models.image,
      }]
    },{
      model: User,
      as : 'receiver',
      include: [{
        model: db.models.image,
      }]
    }]
  });
  return message;
}
//add a message
User.prototype.addMessage = async function(messageBody){
  const message = await db.models.message.create(messageBody);
  return this.getMessage(message);
};
//delete message
User.prototype.deleteMessage = async function(messageId){
  const message = await db.models.message.findByPk(messageId)
  await message.destroy()
};
//********************************************************************************//
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
