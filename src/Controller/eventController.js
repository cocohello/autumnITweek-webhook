/**
 * http://usejsdoc.org/
 */

const orchestrator = require('../Model/orchestrator');


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
		outputContexts.fields.forEach(function (item, index, arr) {
			//if(outputContexts[index].name) {
				//context = outputContexts[2];
				console.log(item.structValue);
				console.log(JSON.stringify(item.structValue));
			//}
		})
		//console.log(JSON.stringify(context));
		//console.log(structjson.jsonToStructProto(context));
		return;
	},
	work2Process : function (parameter) {
		
		return;
	}
}
	

module.exports = evController;