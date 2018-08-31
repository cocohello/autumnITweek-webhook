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
	//[END contructor]
	}
	
	//authenticate and get bearer token
	login () {
		this.opts.url = api+'/Account'
		this.opts.json = this.config
		var token;
		return new Promise((resolve, reject) => {
			request.post(this.opts, function(err, res, body) {
				if (err) {
					console.log('uipath orchestrator error: ', err);
					reject(err);
				} else {
					console.log('uipath orchestrator authenticate response: \n', res.statusCode);
					resolve(res.body.result);
				}
			})
		})
	//[END log in]
	}


	
	
	// put asset
	putAsset (token, assetProperties) {
		token.then(tk => {
			this.opts.url = odata+`/Assets?$filter=contains(Name, '${assetProperties['assetName']}')&$top=4`;
			this.opts.headers = { Authorization: 'Bearer ' + tk };
			
				return new Promise((resolve, reject) => {
					let valueArr = [];
					request.get(this.opts, function(err, res, body) {
						console.log('uipath orchestrator getAsset response: \n', res.statusCode);
						let arr = body.value;
						valueArr['token'] = tk;
						for(let asset in arr){
							if (arr[asset]['Name'] !== 'work1_OBatPath') {
								valueArr[(arr[asset]['Name'])] = arr[asset];
							}
						}
						console.log(0);
						resolve(valueArr);
					}).on('error', err => {
						console.log('uipath orchestrator error: ', err);
						reject(err);
					});
				}).then(valueArr => {//[end promise1]
					return new Promise((resolve, reject) => {
						let flag = 0;
						for (let value in valueArr) {
							if (value === 'token'){
								this.opts.headers = {Authorization: 'Bearer ' + valueArr[value]}
							} else { 
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
											} else {
												console.log('uipath orchestrator putAsset response: \n', res.statusCode);
												if(res.statusCode===200){
													flag++;	
												}
											}
										})
									}
								}
							} 
						}
						resolve('putAsset success '+flag);
						console.log(1);
					});//[end promise2]
				});//[end promise1.then]
				
			})//[end token.then]
	}
	
}

