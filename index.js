/**
 * http://usejsdoc.org/
 */


'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const DelayedResponse = require('http-delayed-response');
const port = process.env.PORT || 8989;//heroku default port

const app = express();

//use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
		// Only extend the timeout for API requests
	  if (!req.url.includes('/work_result')) {
	    next();
	    return;
	  }
	  var delayed = new DelayedResponse(req, res);
	  delayed.json();
	  delayed.start(1000, 20000);
	});

//route service call to router.js
const route = require('./src/Route/router');
app.use('/', route);


const server = app.listen(port, () => {
	console.log('bibiServer listening at port %d', port);
})

server.timeout = 0;
server.on('connection', function(socket) {
	  socket.setTimeout(0); 
	})