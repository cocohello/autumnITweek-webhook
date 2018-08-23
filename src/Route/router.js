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
		console.log(`router.js ${req}`);
		
		let ff_text = 'OK、申請処理始めます。';
		let eventName = 'file_uploaded';
		let lang = 'ja';
		
		const response = {
			fulfillment_text : ff_text,
			followup_event_input : 
			{ event: 
				{ name: eventName,
		    	  languageCode: lang,
		    	 }
			}
		}

		res.setHeader('Content-Type', 'application/json');  
		return res.send(JSON.stringify(response));
	});
	
module.exports = router;
