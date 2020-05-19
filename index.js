const express = require('express');
const server = express();
const userRouter = require('./users/userRouter');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const sessionConfig = {
    name: 'Sunny',
    secret: 'secret sauce',
    cookie: {
        maxAge: 30*1000,
        secure: false,
    },
    httpOnly:true,
    resave: false,
    saveUninitialized: false,   
}

server.use(express.json());
server.use(session(sessionConfig));


server.use('/api', userRouter);

server.listen(PORT, () => {
    console.log(`sever is listening on port ${PORT}...`)
})