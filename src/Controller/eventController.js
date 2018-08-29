/**
 * http://usejsdoc.org/
 */

const orchestrator = require('./Model/orchestrator');

module.exports = function() {
	const middleware = {};
	const config = require('../resource/orchestrator_Environment');
	const O = orchestrator(config);
	let response;
	middleware.work1Process = (queryInput) => {
		
		console.log(O.login);
		
		
		return null;
	}
	
}