/**
 * http://usejsdoc.org/
 */

const orchestrator = require('../Model/orchestrator');
const structjson = require('../Util/structjson');


const evController = {
	work1Process : function (outputContexts) {
		//const config = require('../../resource/orchestrator_Environment');
		//const O = orchestrator(config);
		//let response;
		//.lastIndexOf('/')
		//const dess_path = structjson.structProtoToJson();
		/*for(let context in outputContexts){
			console.log(outputContexts[context]);
		}*/
		var context;
		outputContexts.forEach(function (item, index, outputContexts) {
			//if(outputContexts[index].name) {
				context = outputContexts[2];
				//console.log(context);
			//}
		})
		console.log(JSON.stringify(context).parameters);
		console.log(JSON.stringify(context).parameters['0']);
		
		
		return;
	},
	work2Process : function (parameter) {
		
		return;
	}
}
	

module.exports = evController;