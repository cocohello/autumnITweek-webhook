/**
 * http://usejsdoc.org/
 */

'use strict';

const mysql= require('mysql');
const memInfo = require('../Model/memberInfo');
const Image = require('../Response/image-response');

exports.processResquest = (req, res) => {
/*
	if (req.body.result.action == "work1") {
		getMemberInfo(req, res);
		console.log(req);
	} 
	
	function getMemberInfo (req, res) {
		let memEmail = req.body.result 
						&& req.body.result.parameters 
						&& req.body.result.parameters.email ? 
						req.body.result.parameters.email : 'Unknown';
		
		memInfo.findMember({mem_email : memEmail}, (err, memExist) => {
			if (err) {
				return res.json({
					speech : 'Something went wrong! No member\'s email has found.',
					displayText : 'Something went wrong! No member\'s email has found.',
					source : 'member info'
				});
			}
			
			if (memExist) {
				return res.json({
					speeh : memExist.description,
					displayText : memExist.description,
					source : 'mem info'
				});
			} else {
				return res.json({
					speech : 'Currently I\'m not having information about this user',
					displayText : 'Currently I\'m not having information about this user',
					source : 'mem info'
				});
			}
		});
	}*/
	return res.json({
		  "fulfillmentText": "テストです",
		  "fulfillmentMessages": [
		    {
		      "card": {
		        "title": "card title",
		        "subtitle": "card text",
		        "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
		        "buttons": [
		          {
		            "text": "button text",
		            "postback": "https://assistant.google.com/"
		          }
		        ]
		      }
		    }
		  ],
		  "source": "example.com",
		  "payload": {
		    "slack": {
		      "text": "This is a text response for Slack."
		    }
		  },
		   "followupEventInput": {
		    "name": "file_uploaded",
		    "languageCode": "jp-JA",
		    "parameters": {
		      "param": "param value"
		    }
		  }
		});
}
