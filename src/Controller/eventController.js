/**
 * http://usejsdoc.org/
 */

const orchestrator = require('../Model/orchestrator');


const evController = {
	work1Process : function (parameter) {
		const config = require('../../resource/orchestrator_Environment');
		const O = orchestrator(config);
		let response;
		return;
	},
	work2Process : function (parameter) {
		
		return;
	}
}
	

module.exports = evController;