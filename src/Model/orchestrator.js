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
	opts.json = this.config;
	this.opts = opts;
	
	//[END contructor]
	}
	
	login() {
		//authenticate 
		this.opts.url = api+'/Account'
		var token;
		return new Promise((resolve, reject) => {
		request.post(this.opts, function(err, res, body) {
			if (err) {
				console.log('uipath orchestrator error: ', err);
				reject(err);
			} else {
				console.log('uipath orchestrator authenticate response: \n', res.body);
				resolve(res);
			}
		})
	}).then(res => {
		token = res.body.result;
		console.log(token);
		return token;
	})
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