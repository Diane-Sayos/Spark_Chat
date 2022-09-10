'use strict'
const { faker } = require('@faker-js/faker');
const {db, models: {User, Journal, Image, Message } } = require('../server/db')
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', firstName: 'Cody', lastName: 'Adams', image: faker.image.avatar()}),
    User.create({ username: 'murphy', password: '123', firstName: 'Murphy', lastName: 'Matthews', image: faker.image.avatar()}),
    User.create({username: 'didi', password: 'didi', firstName: 'Didi', lastName: 'Daniels', image: faker.image.avatar()})
  ])
  const journals = await Promise.all([
    Journal.create({
      title:'Times Square Adventure',
      description: 'Times Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square Adventure',
      date: new Date('2202-06-30'),
      userId: 1,
      isPrivate: false
    }),
    Journal.create({
      title:'Central Park Adventure',
      description: 'Times Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square Adventure',
      date: new Date('2202-05-30'),
      userId: 2,
      isPrivate: false
    }),
    Journal.create({
      title:'Brooklyn Bridge',
      description: 'Times Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square Adventure',
      date: new Date('2202-07-30'),
      userId: 3,
      isPrivate: false
    }),
    Journal.create({
      title:'Brooklyn',
      description: 'Times Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square AdventureTimes Square Adventure',
      date: new Date('2202-08-30'),
      userId: 1,
      isPrivate: false
    })
  ])
  await Promise.all([
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 1}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 1}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 1}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 1}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 2}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 2}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 2}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 2}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 3}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 3}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 3}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 3}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 3}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 4}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 4}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 4}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 2}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 2}),
    Image.create({imageUrl: faker.image.food(360, 240, true), journalId: 2}),

  ])
  await Promise.all([
    Message.create({text: 'Hello!', senderId: 1, receiverId: 2, date: new Date('2202-08-30')}),
    Message.create({text: 'Hi!', senderId: 2, receiverId: 1, date: new Date('2202-08-30')}),
    Message.create({text: 'Hello!', senderId: 1, receiverId: 3, date: new Date('2202-09-09')}),
    Message.create({text: 'Hello! How are you?', senderId: 3, receiverId: 1, date: new Date('2202-09-09')}),
    Message.create({text: 'I am doing great. Are we still on?', senderId: 1, receiverId: 3, date: new Date('2202-09-09')}),
    Message.create({text: 'Yes! I am so excited!', senderId: 3, receiverId: 1, date: new Date('2202-09-09')}),
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      didi: users[2]
    },
    journals
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
