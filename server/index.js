const { db, models: {User} } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const ws = require('ws');

const init = async () => {
  try {
    await seed()
    const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
    let sockets = [];
    //socketServer is basically an event listener on server
    const socketServer = new ws.WebSocketServer({
      server
    });
    socketServer.on('connection', (socket) => {
      sockets.push(socket);
      console.log(sockets.length)
      //socket can also send a message
      socket.on('message', (data) => {
        console.log(data.toString())
        //this sends the message to everyone except the sender
        sockets.filter(_socket => _socket !== socket).forEach(socket => {
          socket.send(data.toString())
        })
      })
      //removing the socket/user that closes the app / closes the connection -- we can also add ovent listeners on the socket itself
      socket.on('close', () => {
        sockets = sockets.filter(_socket => _socket !== socket);
      })
    })
  } catch (ex) {
    console.log(ex)
  }
}

init()
// if(process.env.SEED === 'true'){

// }
// else {
//   await db.sync()
// }+
