/**
 * http://usejsdoc.org/
 */

'use strict';
const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');
const structjson = require('../Util/structjson');

let startJobId;
let endJobId;
let resJob;

	// match slack client with member information in DB 	const memberController = require('../Controller/memberController');
	
	router.get('/', (req, res) => {		//error handling for get request handling(Dialogflow provide post request only.)
		console.log(`router.js route ${JSON.stringify(req.body)} \n`);
		res.send(`router.js route ${JSON.stringify(req.body)} \n`);
	});
	
	router.post('/',(req, res) => {
		let response;
		if (!req.body.originalDetectIntentRequest) {			//request from detectWebhookIntent to add followup event
			//console.log(`router.js selfmsg ${JSON.stringify(req.body)}`);
			let text = 'success to catch webhook request';
			let eventName;
			let lang = 'jp';
			let selfmsg = req.body.queryResult.fulfillmentMessages[0].text.text[0];
			switch (selfmsg) {
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
			res.setHeader('Content-Type', 'application/json');  
			res.send(JSON.stringify(response));
		} else {	//request from detectEventIntent to process login, in this case, UI Path Orchestrator 
			//console.log(`router.js detectedEvent ${JSON.stringify(req.body)}`);
			
			let detectedEvent = req.body.queryResult.queryText;
			switch (detectedEvent) {
				case 'work1_process_event' :
					var result = eventController.work1Process(structjson.jsonToStructProto(req.body.queryResult.outputContexts))
					result.then(result => {
						console.log(result);
						console.log(5);
						startJobId = result;
						resJob = res;
					});
					
					break;
				case 'work2_process_event' :
					eventController.work2Process(req.queryInput);
					break;
			}
		}
	});
	
	router.get('/work1_result', (req, res) => {
		console.log(`router.js from orchestrator ${JSON.stringify(req.query.jobId)} \n`);
		this.res = resJob;
		this.res.setHeader('Content-Type', 'application/json');  
		this.res.send(JSON.stringify());
	});
	
	
module.exports = router;
