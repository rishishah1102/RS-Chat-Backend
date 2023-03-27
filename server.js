const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
// const socketIO = require('socket.io');
// const jwt = require('jsonwebtoken');
// const User = require('./Models/userModel');

const app = express();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("The database connection is successfull"));

const server = http.createServer(app);
// const io = socketIO(server);

// let user;
// let consumer = [];

// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (!token) {
//         return false;
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//         user = decoded;
//     } catch (err) {
//         // return res.status(401).send({message: "Invalid Token"});
//         console.log(err);
//         return false;
//     }

//     return next();

// }).on('connection', (socket) => {
//     let userjoinedName;
//     // console.log(socket);
//     socket.on('joined', ({ user }) => {
//         console.log(user);
//         userjoinedName = user;
//         consumer.push({ name: user, id: socket.id });
//         console.log(consumer);
//     });

//     console.log(consumer);

//     socket.on('send_message', async (data) => {
//         const phoneNum = user.phoneNumber;
//         console.log(phoneNum);
//         const { myName, name, chatterPhoneNumber, chatting } = data;
//         console.log(chatterPhoneNumber);
//         try {
//             console.log("inside");
//             const foundUser1 = await User.findOne({ phoneNumber: phoneNum, 'chats.name': name });
//             const foundUser2 = await User.findOne({ phoneNumber: chatterPhoneNumber, 'chats.name': myName });
//             console.log(foundUser1);
//             console.log(foundUser2);
            
//             if (foundUser1 && foundUser2) {
//                 // Here $ in chats.$.chatting represents the index of chats.name:name.
//                 const messageData1 = await User.updateOne({ phoneNumber: phoneNum, 'chats.name': name }, { $push: { 'chats.$.chatting': chatting } });
//                 const messageData2 = await User.updateOne({ phoneNumber: chatterPhoneNumber, 'chats.name': myName }, { $push: { 'chats.$.chatting': chatting } });
                
//                 const rsID2 = consumer[consumer.findIndex(x => x.name === myName)].id;
//                 console.log(rsID2);
//                 const rsID1 = consumer[consumer.findIndex(x => x.name === name)].id;

//                 if (messageData1 && messageData2) {
//                     if (rsID1) {
//                         // rsID1.emit('receive_message', {status: "200", data: {chatting: chatting}});
//                         console.log("inside rsID1");
//                         io.to(rsID1).emit('receive_message', { status: "200", data: { chatting: chatting } });
//                         io.to(rsID2).emit('receive_message', { status: "200", data: { chatting: chatting } });
//                     }
//                     else {
//                         io.to(rsID2).emit('receive_message', { status: "200", data: { chatting: chatting } });
//                         console.log('outside rsd1');
//                     }
//                 }
//                 else {
//                     io.to(name).emit('receive_message', { status: "500", data: { message: "Server is down!" } });
//                 }
//             }
//             else {
//                 console.log("outside ahsdh");
//                 const addUserInChat1 = await User.updateOne({ phoneNumber: phoneNum }, { $push: { chats: { name: name, chatting: [chatting] } } });
//                 const addUserInChat2 = await User.updateOne({ phoneNumber: chatterPhoneNumber }, { $push: { chats: { name: myName, chatting: [chatting] } } });

//                 const rsID2 = consumer[consumer.findIndex(x => x.name === myName)].id;
//                 const rsID1 = consumer[consumer.findIndex(x => x.name === name)].id;

//                 if (addUserInChat1 && addUserInChat2) {
//                     // io.to(name).emit('receive_message', {status: "200", data: {chatting: chatting}});
//                     if (rsID1) {
//                         io.to(rsID1).emit('receive_message', { status: "200", data: { chatting: chatting } });
//                         io.to(rsID2).emit('receive_message', { status: "200", data: { chatting: chatting } });
//                         console.log("inside rsID1");
//                     }
//                     else {
//                         io.to(rsID2).emit('receive_message', { status: "200", data: { chatting: chatting } });
//                         console.log('outside rsd1');
//                     }
//                 }
//                 else {
//                     io.to(name).emit('receive_message', { status: "500", data: { message: "Server is down!" } });
//                 }
//             }
//         } catch (err) {
//             io.emit('receive_message', { status: "500", data: { message: "Server is down!" } });
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log(`${userjoinedName} left`);
//         // consumer.splice(consumer.findIndex(x => x.name === userjoinedName), 1)
//         consumer.filter(function (user, index) {
//             if (user.name === userjoinedName) {
//                 consumer.splice(index, 1);
//             }
//         })
//     })
// });

server.listen(port, () => {
    console.log("The server is listening on the port " + port);
});