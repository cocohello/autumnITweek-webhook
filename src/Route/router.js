/**
 * http://usejsdoc.org/
 */

'use strict';
var express = require('express');

module.exports = (app) => {
	// match slack client with member information in DB
	const memberController = require('../Controller/memberController');
	
	const bibiRouter = express.Router();
	
	app.get('/aa', (req, res) => {
		console.log(`!router.js app.get ${req} \n`);
		res.send(`お疲れ様です。`);
	});
	
	app.route('/').post(memberController.processResquest);
	
};