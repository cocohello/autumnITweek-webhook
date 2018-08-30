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
		var arr = outputContexts.fields;
		/*for(let context in arr){
			//console.log(arr[context]);
			console.log(arr[context].structValue.fields.parameters);
			//console.log(structjson.structProtoToJson(arr[2].structValue.fields.parameters));
		}*/
		var context;
		arr.forEach(function (item, index, arr) {
			//if(outputContexts[index].name) {
				//context = outputContexts[2];
				console.log(item);
				console.log('\n');
				console.log(arr[2].structValue.fields.parameters);
				//console.log(arr[2].);
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