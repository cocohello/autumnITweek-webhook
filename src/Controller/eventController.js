/**
 * http://usejsdoc.org/
 */

const orchestrator = require('../Model/orchestrator');

module.exports = {
	work1Process : work1Process,
	work2Process : work2Process
}
	
const work1Process = function (parameter) {
	const config = require('../../resource/orchestrator_Environment');
	const O = orchestrator(config);
	let response;
	middleware.work1Process = (queryInput) => {
		
		console.log(O.login);
		
		
		return null;
	}
	
}

const work2Process = function (parameter) {
	
	return;
}