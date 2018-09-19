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

const server = app.listen(port, () => {
	console.log('bibiServer listening at port %d', port);
})

server.timeout = 2147483647;
server.on('connection', function(socket) {
	  socket.setTimeout(2147483647); 
	  // 30 second timeout. Change this as you see fit.
	})