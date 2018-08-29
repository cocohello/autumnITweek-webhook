/**
 * http://usejsdoc.org/
 */

const orchestrator = require('../Model/orchestrator');

module.exports = {
	'work1Process' : work1Process,
	'work2Process' : work2Process
}
	
const work1Process = function (parameter) {
	const config = require('../../resource/orchestrator_Environment');
	const O = orchestrator(config);
	let response;
	
}

const work2Process = function (parameter) {
	
	return;
}