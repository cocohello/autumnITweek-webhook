/**
 * http://usejsdoc.org/
 */

'use strict';
const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');
const structjson = require('../Util/structjson');

let startJobId;
let resJob;

	// match slack client with member information in DB 	const memberController = require('../Controller/memberController');
	
	router.get('/', (req, res) => {		//error handling for get request handling(Dialogflow provide post request only.)
		console.log(`router.js route ${JSON.stringify(req.body)} \n`);
		res.send(`router.js route ${JSON.stringify(req.body)} \n`);
	});
	
	router.post('/work1_result', (req, res) => {
		console.log(`router.js from orchestrator ${JSON.stringify(req.body.jobId)} \n`);
		if(req.body.jobId === startJobId.toString){
			this.res = resJob;
			//let response = {};
			let response = {"webhookPayload": {
				"attachments": [
					{
						"title": "chart1",
						"text": "How does this look? @slack-ops - Sent by Julie Dodd",
						"image_url": "https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
						"color": "#764FA5"
					},
					{
						"title": "chart2",
						"text": "How does this look? @slack-ops - Sent by Julie Dodd",
						"image_url": "https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
						"color": "#764FA5"
					},
					{
						"title": "https://bbbotserver.herokuapp.com",
						"title_link": "https://bbbotserver.herokuapp.com",
						"color": "#764FA5"
					}
					]
			}}
			this.res.setHeader('Content-Type', 'application/json');  
			this.res.send(JSON.stringify(response));
		}
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
						if(typeof result === 'string'){
							console.log(result);
							console.log(5);
							let response = {
									fulfillmentText : 'サーバ障害で処理できませんでした。',
							}
							res.setHeader('Content-Type', 'application/json');  
							res.send(JSON.stringify(response));
						}else if(typeof result === 'number'){
							console.log(result);
							console.log(5);
							startJobId = result;
							resJob = res;	
						}
					});
					
					break;
				case 'work2_process_event' :
					eventController.work2Process(req.queryInput);
					break;
			}
		}
	});
	
	
	
	
	
module.exports = router;
