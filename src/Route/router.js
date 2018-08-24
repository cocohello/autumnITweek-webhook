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
		console.log(`router.js ${req.body}`);
		
		let ff_text = 'OK';
		let eventName = 'work1_process_event';
		let lang = 'jp';
		
		const response = {
			fulfillmentText : ff_text,
			followupEventInput : 
				{ name : eventName,
		    	  languageCode : lang,
		    	}
		}

		res.setHeader('Content-Type', 'application/json');  
		res.send(JSON.stringify(response));
	});
	
module.exports = router;
