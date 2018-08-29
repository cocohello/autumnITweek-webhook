/**
 * http://usejsdoc.org/
 */

'use strict';
const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');


	// match slack client with member information in DB 	const memberController = require('../Controller/memberController');
	
	router.get('/', (req, res) => {		//error handling for get request handling(Dialogflow provide post request only.)
		console.log(`!router.js app.get ${req} \n`);
		res.send('Hello');
	});
	
	router.post('/',(req, res) => {
		//console.log(`router.js ${JSON.stringify(req.body)}`);
		let response;
		if (req.body.queryResult) {			//request from detectWebhookIntent to add followup event
			let text = 'success to catch webhook request';
			let eventName;
			let lang = 'jp';
			console.log(`router.js ${JSON.stringify(req.body.queryResult.fulfillmentMessages[0])}`);
			switch (req.body.queryResult.fulfillmentMessages.text.text) {
				case 'OK、申請処理始めます。' : 
					eventName = 'work1_process_event';
					break;
				case 'かしこまりました。少々お待ちください。' :
					eventName = 'work2_process_event';
					break;
				default : eventName = null; 
			}
			
			response = {
				fulfillmentText : text,
				followupEventInput : 
					{	name : eventName,
						languageCode : lang
					}
			}
			
		} else if (req.body.queryInput) {	//request from detectEventIntent to process login, in this case, UI Path Orchestrator 
			switch (req.queryInput.event.name) {
				case 'work1_process_event' : 
					eventController.work1Process(req.queryInput);
					break;
				case 'work2_process_event' :
					eventController.work2Process(req.queryInput);
					break;
			}
		}
		res.setHeader('Content-Type', 'application/json');  
		res.send(JSON.stringify(response));
	});
	
module.exports = router;
