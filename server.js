const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // <<<Step 1. importing third party security middleware

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// middleware

// custom middleware
function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`)
  
  next(); // allows the request to continue to the next middleware or route handler
};

// write a gatekeeper middleware that reads a password from the headers and if the password is 'melon', let it continue. If not, send back status code 401 and a message.
function atGate(req, res, next) {
  const password = req.headers.password;

  if(password && password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass!' })
  }
}


// check to see if role is 'admin' or 'agent'
function checkRole(role) {
  return function(req, res, next){
    if (role && role === req.headers.role) {
      next();
    } else {
      res.status(403).json({ message: "can't touch this!" });
    }
  };
}


server.use(helmet()); // <<<Step 2. using the security middleware implement in all projects moving forward. This disables certain information to be shared online and helps to stop hacker attacks. To use globally you write it here, so that it runs every time an endpoint is hit. 
server.use(express.json()); // built-in middleware
server.use(logger);


// endpoints
server.use('/api/hubs', helmet(), atGate, checkRole('admin'), hubsRouter); // the router is local middleware because it only applies to /api/hubs. Invoking helmet here makes it's use local being applied to these specific endpoints

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get('/echo', (req, res) => {
  res.send(req.headers);
}); // not protected by helmet, so all header info is shared on the internet subjecting it to hacker attacks.

// want to use helmet to protect this endpoint, protects this 'top secret' endpoint by not sharing vulnerable information on the internet.
server.get('/area51', atGate, checkRole('agent'), (req, res) => {
  res.send(req.headers);
});

module.exports = server;
