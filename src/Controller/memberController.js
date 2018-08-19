/**
 * http://usejsdoc.org/
 */

'use strict';

const mysql= require('mysql');
const memInfo = require('../Model/memberInfo');

exports.processResquest = (req, res) => {

	if (req.body.result.action == "memberInfo") {
		getMemberInfo(req, res);
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
	}
}
