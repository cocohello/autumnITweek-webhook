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

	const opts = {};

	if (config.usernameOrEmailAddress) {
		opts.usernameOrEmailAddress = config.usernameOrEmailAddress;
	} else {
		try {
			const env = path.join('..', 'resource', 'orchestrator_Environment');
			this.projectId = env.usernameOrEmailAddress;
		} catch (err) {
			throw new Error('username Or EmailAddress must be provided or available in the keyFile.');
		}
	}
	if (config.password) {
		opts.password = config.password;
	} else {
		try {
			const env = path.join('..', 'resource', 'orchestrator_Environment');
			this.password = env.password;
		} catch (err) {
			throw new Error('password must be provided or available in the keyFile.');
		}
	}
	if (config.tenancyName) {
		opts.tenancyName = config.tenancyName;
	}

	//authenticate 
	request.post(opts, function(err, res, body) {
		console.log('REQUEST RETRIEVE STATUS', res.status);
		if (err) {
			debug('uipath orchestrator error: ', err);
		} else {
			debug('uipath orchestrator authenticate response: \n', res);
			this.token = body.result;
		}
	})
	//[END contructor]
	}
	
	login() {
		console.log(this.token);
		return this.token;
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