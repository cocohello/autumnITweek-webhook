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
		
		let ff_text = 'OK、申請処理始めます。';
		let eventName = 'work1_process_event';
		let lang = 'jp';
		
		const response = {
			fulfillmentText : ff_text,
			followupEventInput : 
				{ name: eventName,
		    	  languageCode: lang,
		    	}
		}

		res.setHeader('Content-Type', 'application/json');  
		res.send(json({fulfillmentText:'oook', languageCode : 'jp'}));
	});
	
module.exports = router;
