/**
 * http://usejsdoc.org/
 */

'use strict';
const express = require('express');
const router = express.Router();

	// match slack client with member information in DB
	const memberController = require('../Controller/memberController');
	
	router.get('/', (req, res) => {
		console.log(`!router.js app.get ${req} \n`);
		res.send('Hello');
	});
	
	router.post('/',(req, res) => {
		console.log(`router.js ${JSON.stringify(req)}`);
		
		res.setHeader('Content-Type', 'application/json');  
		return res.send(JSON.stringify({ fulfillmentText: 'OOOKKKK', source: 'OOKKK' }));
	});
	
module.exports = router;
