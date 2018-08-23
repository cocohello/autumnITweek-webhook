/**
 * http://usejsdoc.org/
 */

'use strict';
var express = require('express');

module.exports = (app) => {
	// match slack client with member information in DB
	const memberController = require('../Controller/memberController');
	
	const bibiRouter = express.Router();
	
	app.get('/', (req, res) => {
		console.log(`!router.js app.get ${req} \n`);
		res.send(`${req}`);
	});
	
	app.route('/').post((req, res) => {
		res.setHeader('Content-Type', 'application/json');  
		res.send(JSON.stringify({ 'speech': 'OOOOK', 'displayText': 'OOOOK' }));
	});
	
};