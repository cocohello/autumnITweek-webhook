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

//route service call to router.js
const route = require('./src/Route/router');
app.use('/', route);
app.use(function (req, res) {
	if (!req.url.includes('/work_result')) {
	 console.log('come here??');
		next();
	    return;
	}
	console.log('come??');
	  var delayed = new DelayedResponse(req, res);
	  // verySlowFunction can now run indefinitely
	  delayed.start();
	});


const server = app.listen(port, () => {
	console.log('bibiServer listening at port %d', port);
})

server.timeout = 0;
server.on('connection', function(socket) {
	  socket.setTimeout(0); 
	})