var path = require('path');
var colors = require("colors"); // npm install colors https://www.npmjs.com/package/colors


//========== EXPRESS ==============
const express = require('express');
const app = express();


//========== BODY PARSER ==============
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//============= BCRYPT ===================
const bcrypt = require("bcrypt");

// =========== SERVER CONNECTION ============

const server = app.listen(5000);

// ===================================== SOCKET =============================

// users [];
// connections = [];

// const io = require("socket.io").listen(server);

// // ========= CONNECT =============
// io.on('connection', function(socket){
//     connections.push(socket);
//     console.log("connected:  %s sockets connected", connections.length);

//     // ========== DISCONNECT =============
//     socket.on("disconnect", function(data){
//         users.splice(users.indexOf(socket.username), 1);
//         updateUserNames();
//         connections.splice(connections.indexOf(socket), 1); // splice first param = index, second param = 1, which says to remove 1 element from index of socket
//         console.log("Disconnected:  %s sockets connected", connections.length);
//     });
//     // ========= SEND MESSAGE =============
//     socket.on('send message', function (data){  // # 1 -- listening to message that is submitted
//         io.emit('new message', {newMsg: data, user: socket.username}); // # 2 -- sends back the new message after listening to it from the client side
//     });
//     //========= NEW USER ================
//     socket.on('new user', function(data, callback){ 
//         // # 3 gets the username value and pushes it into the users array, updates usernames by calling the function
//         callback(true); // saying there needs to be a callback
//         socket.username = data;
//         users.push(socket.username);
//         updateUserNames();

//     })
//     // # 4 function that update usernames 
//     function updateUserNames(){ 
//         io.emit('get users', users); // users is the array with all user names

//     }




    // ============== SESSION =====================
    var session = require('express-session')
    app.use(session({
        secret: 'encryption key',
        resave: false,
        saveUninitialized: true
    }))

    // ============== SQL =============================
    require('./server/config/sql.js');


    // ============ Routes ============

    //======== ANGULAR ROUTE ========
    app.use(express.static(__dirname + '/public/dist/public'));

    require('./server/config/routes')(app);
    // // widlcard for angular
    // app.all("*", (req,res,next) => {
    //     res.sendFile(path.resolve("./public/dist/public/index.html"))
    // });


// ------------------ END ------------------