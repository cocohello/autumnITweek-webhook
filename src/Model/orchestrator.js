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
	
	//get assetId
	getAsset (token, assetName) {
		token.then( tk => {
			console.log(tk);
			this.opts.url = odata+`/Assets?$filter=contains(Name, '${assetName}')&$top=4`;
			this.opts.headers = { Authorization: 'Bearer ' + tk };
			console.log(this.opts);
			return new Promise((resolve, reject) => {
				request.get(this.opts, function(err, res, body) {
					if (err) {
						console.log('uipath orchestrator error: ', err);
						reject(err);
					} else {
						console.log('uipath orchestrator getAsset response: \n', res.statusCode);
						resolve(body);
					}
				});
			}).then(body => {
				console.log(body);
			})
		});
		
	}
	putAsset (token) {
		//authenticate 
		this.opts.url = odata+'/Assets(44474)'
		this.opts.json = {
			"Name": "string",
			"ValueScope": "Global",
			"ValueType": "Text",
			"Value": "success",
			"StringValue": "success",
			"BoolValue": false,
			"IntValue": 0,
			"CredentialUsername": "",
			"CredentialPassword": "",
			"Id": 44474,
			"KeyValueList": []
		}
		this.opts.headers = {Authorization: 'Bearer ' + token}
		console.log(this.opts);
		return new Promise((resolve, reject) => {
			request.put(this.opts, function(err, res, body) {
				if (err) {
					console.log('uipath orchestrator error: ', err);
					reject(err);
				} else {
					console.log('uipath orchestrator putAsset response: \n', res.statusCode);
					resolve(res);
				}
			})
		}).then(res => {
			console.log('success to put Asset ');
		})
	//[END log in]
	}
	
	
}


/*
function askForPassword(callback) {
    var readline = require('readline');
    // noinspection JSUnresolvedVariable
    var Writable = require('stream').Writable;
    var rl;
    var mutableStdout = new Writable({
        write: function (chunk, encoding, callback) {
            // noinspection JSLint
            if (!this.muted) {
                process.stdout.write(chunk, encoding);
            }
            callback();
        }
    });
    mutableStdout.muted = false;
    rl = readline.createInterface({
        input: process.stdin,
        output: mutableStdout,
        terminal: true
    });

    rl.question('Password: ', function (password) {
        callback(password);
        rl.close();
    });
    mutableStdout.muted = true;
}

askForPassword(function (password) {
    *//** @type {number} *//*
    var startTimestamp = Date.now();
    *//** @type {Orchestrator} *//*
    var test = new Orchestrator({
    	usernameOrEmailAddress: ENVIRONMENT.emailAddres,
        tenancyName: ENVIRONMENT.tenancyName,
        password: password
    });

    *//** @param {number} count *//*
    function testGetUsers(count) {
        test.get('/odata/Users', {}, function (err, data) {
            console.log('This is attempt #' + count + ': ' + (Date.now() - startTimestamp));
            if (err) {
                console.error('Error: ' + err);
            }
            console.log('Data: ' + util.inspect(data));
        });
    }

    // by executing multiple requests without waiting we validate the queueing behavior
    testGetUsers(1);
    testGetUsers(2);
    test.v2.odata.getUsers({}, function (err, data) {
        console.log('This is attempt #3: ' + (Date.now() - startTimestamp));
        if (err) {
            console.error('Error: ' + err);
        }
        console.log('Data: ' + util.inspect(data));
    });
});
*/