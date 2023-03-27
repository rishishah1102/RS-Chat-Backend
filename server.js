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
})
.then(() => console.log("The database connection is successfull"))
.catch((err) => console.log(err));

const server = http.createServer(app);

server.listen(port, () => {
    console.log("The server is listening on the port " + port);
});