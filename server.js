const express = require('express');
const server = express();
const morgan = require('morgan');


server.use(logger);
server.use(morgan('dev'));
server.use(express.json());

const UserRouter = require('./users/userRouter');
server.use('/api/users', UserRouter);

const PostRouter = require('./posts/postRouter');
server.use('/api/posts', PostRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url)
  console.log(new Date());
  next();
}

module.exports = server;
