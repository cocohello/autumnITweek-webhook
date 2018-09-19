/**
 * http://usejsdoc.org/
 */


'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8989;//heroku default port

const app = express();

//use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname)));

//route service call to router.js
const route = require('./src/Route/router');
app.use('/', route);

const extendTimeoutMiddleware = (req, res, next) => {
	  const space = ' ';
	  let isFinished = false;
	  let isDataSent = false;

	  // Only extend the timeout for API requests
	  if (!req.url.includes('/work_result')) {
	    next();
	    return;
	  }

	  res.once('finish', () => {
	    isFinished = true;
	  });

	  res.once('end', () => {
	    isFinished = true;
	  });

	  res.once('close', () => {
	    isFinished = true;
	  });

	  res.on('data', (data) => {
	    // Look for something other than our blank space to indicate that real
	    // data is now being sent back to the client.
	    if (data !== space) {
	      isDataSent = true;
	    }
	  });

	  const waitAndSend = () => {
	    setTimeout(() => {
	      // If the response hasn't finished and hasn't sent any data back....
	      if (!isFinished && !isDataSent) {
	        // Need to write the status code/headers if they haven't been sent yet.
	        if (!res.headersSent) {
	          res.writeHead(202);
	        }

	        res.write(space);

	        // Wait another 15 seconds
	        waitAndSend();
	      }
	    }, 30000);
	  };
console.log('its work?');
	  waitAndSend();
	  next();
	};

	app.use(extendTimeoutMiddleware);





const server = app.listen(port, () => {
	console.log('bibiServer listening at port %d', port);
})

server.timeout = 0;
server.on('connection', function(socket) {
	  socket.setTimeout(0); 
	})