/**
 * http://usejsdoc.org/
 */

'use strict';
const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');
const structjson = require('../Util/structjson');
const DelayedResponse = require('http-delayed-response');
const path = require('path');
//const pdf = require('pdf-poppler');
var fs = require('fs');
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
	let delayed;
	router.post('/work_result', (req, res) => {
		console.log(flag);
		if(flag === 0){
			if(req.body.queryResult.action === 'intent_work1-uploadfile-event_trigger') {
				console.log('work_result');
				//console.log(structjson.structProtoToJson(req.body.queryResult.outputContexts[0].parameters)['0']['dest_path']);
				var dir = (structjson.structProtoToJson(req.body.queryResult.outputContexts[0].parameters)['0']['dest_path']).replace(/\\/g, "/");
				let file = (dir+'/申請結果.pdf');

				response.responseId = req.body.responseId;
				response.queryResult = req.body.queryResult;
				response.queryResult.webhookSource = file;
				  
			}else if(req.body.queryResult.action === 'intent_work2-event_trigger'){
				response.responseId = req.body.responseId;
				response.queryResult = req.body.queryResult;
				response.queryResult.webhookPayload = {
						"attachments": [
							{
								"pretext": response.queryResult.fulfillmentText
							},
							{
								"title": "経費平均申請金額",
								"text": "経費統計折り線図",
								"image_url": "https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
								"color": "#764FA5"
							},
							{
								"title": "個人経費申請",
								"text": "個人経費統計・一回当たり",
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
			
		    delayed = new DelayedResponse(req, res);
		    delayed.json();
		    delayed.start(1000, 10000);

			resJob = res;
			flag++;
		}else{
			console.log(`router.js from orchestrator ${JSON.stringify(req.body.jobId)} \n`);
			//resJob.send(JSON.stringify(response));
			if(req.body.chart1||req.body.chart1||req.body.link){
				response.queryResult.webhookPayload['attachments'][1]['image_url']=req.body.chart1;
				response.queryResult.webhookPayload['attachments'][2]['image_url']=req.body.chart2;
				response.queryResult.webhookPayload['attachments'][3]['title']=req.body.link;
				response.queryResult.webhookPayload['attachments'][3]['title_link']=req.body.link;
			}
			delayed.end(null, response);
			res.send(JSON.stringify(response));
			flag=0;
			response = {};
		}
	})
	
	
module.exports = router;

