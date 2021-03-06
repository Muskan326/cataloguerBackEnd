/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib');
const { count } = require('console');

const notify= require('../controllers/notifyController')

const userModel = mongoose.model('User')

let setServer = (server) => {

    let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection',(socket) => {

        console.log("on connection--emitting verify user");

        // code to verify the user and make him online

        socket.on('set-user',(userId) => {

            userModel.findOne({'userId':userId},(err,result)=>{
                if(err){
                    socket.emit('auth-error','User not found')
                }
                else if(check.isEmpty(result)){}
                else{
                    socket.userId=result.userId
                    socket.fullName=`${result.firstName} ${result.lastName}`
                    console.log(`${socket.fullName} is online`)
                    let userObj = {userId:socket.userId,fullName:socket.fullName}
                    let count=0
                    for(let each of allOnlineUsers){
                        if(each.userId!=socket.userId){
                            count+=1
                        }
                    }
                    if(count==allOnlineUsers.length){
                        allOnlineUsers.push(userObj)
                    }
                    console.log(allOnlineUsers)
                    socket.room= 'MyRoom'
                    // joining chat-group room.
                    socket.join(socket.room)

                    socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers);
                }
            })},
        
        )
        
        
        socket.on('sendUpdate',(data)=>{
            for(let each of data.viewers){
                socket.to(socket.room).broadcast.emit(each,data); 
            }
            notify.saveNotification(data)
            console.log('sending update')
        })// end of listening set-user event



        socket.on("request",(data)=>{
            for(let each of data.receiver){
                console.log(each)
                notify.saveNotification(data)
                socket.to(socket.room).broadcast.emit(`${each.userId}`,data);
                console.log("Emitted "+each.userId)
            }
            
        })



        socket.on('disconnect', () => {
            console.log(`${socket.userId} is disconnected`);
            // console.log(socket.connectorName);
            console.log(socket.userId);
            var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex,1)
            console.log(allOnlineUsers)
        
            socket.to(socket.room).broadcast.emit('online-user-list',allOnlineUsers);
            socket.leave(socket.room)
        })


        

    }
    )
    


}

module.exports = {
    setServer: setServer,
}
