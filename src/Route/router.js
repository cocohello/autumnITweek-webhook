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
	
	router.post('/',(req, res) => {
		let response={};
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
				case (selfmsg.match(/かしこまりました。.*ですね。しばらくお待ちください。/) || {}).input:
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
			let result;
			switch (detectedEvent) {
				case 'work1_process_event' :
					result = eventController.work1Process(structjson.jsonToStructProto(req.body.queryResult.outputContexts))
					break;
				case 'work2_process_event' :
					result = eventController.work2Process(structjson.jsonToStructProto(req.body.queryResult.outputContexts))
					break;
			}
			result.then(result => {
				let response={};
				if(typeof result === 'string'){
					console.log(result);
					console.log(5);
					response = {
							fulfillmentText : 'サーバ障害で処理できませんでした。',
					}
					res.setHeader('Content-Type', 'application/json');  
					res.send(JSON.stringify(response));
				}else if(typeof result === 'number'){
					console.log(5);
					console.log(result);
					startJobId = result;
					res.setHeader('Content-Type', 'application/json');  
					res.send(JSON.stringify(response));
				}
			});
		}
	});
	
	
	/*router.get('/work', (req, res) => {
		console.log(`router.js from orchestrator ${JSON.stringify(req.body.jobId)} \n`);
		let response = {};
		res.json(response);
		
		if(Number(req.body.jobId) === startJobId){
		resJob.setHeader('Content-Type', 'application/json');  
		resJob.send(JSON.stringify(response));
		}
	});*/
	let flag = 0;
	let response = {};
	router.post('/work_result', (req, res) => {
		console.log(flag);
		if(flag === 0){
			if(req.body.queryResult.action === 'intent_work1-uploadfile-event_trigger') {
				console.log('work_result');
				console.log(structjson.structProtoToJson(req.body.queryResult.outputContexts[0].parameters)['0']['dest_path']);
				response.responseId = req.body.responseId;
				response.queryResult = req.body.queryResult;
				response.queryResult.webhookSource = structjson.structProtoToJson(req.body.queryResult.outputContexts[0].parameters)['0']['dest_path']+'申請結果.pdf';
			}else if(req.body.queryResult.action === 'intent_work2-event_trigger'){
				response.responseId = req.body.responseId;
				response.queryResult = req.body.queryResult;
				response.queryResult.webhookPayload = {
						"attachments": [
							{
								"pretext": response.queryResult.fulfillmentText
							},
							{
								"title": "chart1",
								"text": "How does this look? ",
								"image_url": "https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
								"color": "#764FA5"
							},
							{
								"title": "chart2",
								"text": "How does this look? ",
								"image_url": "https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
								"color": "#764FA5"
							},
							{
								"title": "https://bbbotserver.herokuapp.com",
								"title_link": "https://bbbotserver.herokuapp.com",
								"color": "#36a64f"
							}
							]
				}
			}
			resJob = res;
			flag++;
		}else{
			console.log(`router.js from orchestrator ${JSON.stringify(req.body.jobId)} \n`);
			console.log(response);
			resJob.setHeader('Content-Type', 'application/json');  
			resJob.send(JSON.stringify(response));
			res.setHeader('Content-Type', 'application/json');  
			res.send(JSON.stringify(response));
			flag=0;
			response = {};
		}
	})
	
	
module.exports = router;

