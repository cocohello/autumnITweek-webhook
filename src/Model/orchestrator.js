/**
 * http://usejsdoc.org/
 */

'use strict';

const util = require('util');
const path = require('path');
const request = require('request');
var api = 'https://platform.uipath.com/api';
var odata = 'https://platform.uipath.com/odata';
module.exports= function(config) {
    return new Orchestrator(config);
};

class Orchestrator {
	//create contructor for UI Path Orchestrator
	constructor(config) {//config is a parameter contains LoginModel

		this.config = config;

	if (!config.usernameOrEmailAddress) {
		try {
			const env = path.join('..', 'resource', 'orchestrator_Environment');
			this.config.usernameOrEmailAddress = env.usernameOrEmailAddress;
		} catch (err) {
			throw new Error('username Or EmailAddress must be provided or available in the keyFile.');
		}
	}
	if (!config.password) {
		try {
			const env = path.join('..', 'resource', 'orchestrator_Environment');
			this.config.password = env.password;
		} catch (err) {
			throw new Error('password must be provided or available in the keyFile.');
		}
	}

	const opts = {
		'Content-Type' : 'application/json'
	};
	this.opts = opts;
	}//[END contructor]
	
	
	//authenticate and get bearer token
	login () {
		this.opts.url = api+'/Account';
		this.opts.json = this.config;
		let token;
		return new Promise((resolve, reject) => {
			request.post(this.opts, function(err, res, body) {
				if (err) {
					console.log('uipath orchestrator error: ', err);
					reject(err);
				} else {
					console.log('uipath orchestrator authenticate response: \n', res.statusCode);
					resolve(body.result);
				}
			})
		})
	}//[end log in]

	getAsset (token, assetProperties) {
		this.opts.headers = { Authorization: 'Bearer ' + token };
		this.opts.url = odata+`/Assets?$filter=contains(Name, '${assetProperties['assetName']}')&$top=4`;
			return new Promise((resolve, reject) => {
				let valueArr = [];
				request.get(this.opts, function(err, res, body) {
					console.log('uipath orchestrator getAsset response: \n', res.statusCode);
					let arr = body.value;
					for(let asset in arr){
						if (arr[asset]['Name'] !== 'work1_OBatPath') {
							valueArr[(arr[asset]['Name'])] = arr[asset];
						}
					}
					resolve(valueArr);
				}).on('error', err => {
					console.log('uipath orchestrator error: ', err);
					reject(err);
				});
			})
		this.opts.url = '';
		this.opts.json = {};
	}//[end getAsset]
	
	putAsset (valueArr, assetProperties) {
		return new Promise((resolve, reject) => {
			for (let value in valueArr) {
				for (let para in assetProperties) {
					if (para === value) {
						this.opts.url = odata+`/Assets(${valueArr[value]['Id']})`;
						if (typeof assetProperties[para] === 'string') {
							valueArr[value]['StringValue'] = assetProperties[para];
						} else if (typeof assetProperties[para] === 'number') {
							valueArr[value]['IntValue'] = assetProperties[para];
						}
						this.opts.json = valueArr[value];
						request.put(this.opts, function(err, res, body) {
							if (err) {
								console.log('uipath orchestrator error: ', err);
								reject(err);
							} else {
								console.log('uipath orchestrator putAsset response: \n', res.statusCode);
							}
						})
					}
				}
			}
				resolve(flag);
		})//
		this.opts.url = '';
		this.opts.json = {};
	}//[end putAsset]
	
	getReleaseId(processKey){
		this.opts.url = odata+`/Releases?$filter=contains(ProcessKey,'${processKey}')`;
		console.log(this.opts);
		return new Promise((resolve, reject) => {
			request.get(this.opts, function(err, res, body) {
				resolve(body.value(0).Key);
			})
		})
		this.opts.url = '';
		this.opts.json = {};
	}//[end getReleaseId]
	
}

