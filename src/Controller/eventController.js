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
		var parameters;
		outputContexts.forEach(function (context, index, outputContexts) {
			//if(outputContexts[index].name) {
				parameters = outputContexts[2];
				//console.log(parameters);
			//}
		})
		console.log(JSON.stringify(parameters));
		console.log(JSON.parse(parameters));
		console.log(structjson.structProtoToJson(parameters));
		
		
		return;
	},
	work2Process : function (parameter) {
		
		return;
	}
}
	

module.exports = evController;