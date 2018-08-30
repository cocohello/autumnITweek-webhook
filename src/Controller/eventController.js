/**
 * http://usejsdoc.org/
 */

//const structjson = require('../Util/structjson');
const path = require('path');
const orchestrator = require('../Model/orchestrator');
const O = orchestrator(path.join('..', 'resource', 'orchestrator_Environment'));

const evController = {
	work1Process : function (outputContexts) {
		O.login();
		/*//const config = require('../../resource/orchestrator_Environment');
		//const O = orchestrator(config);
		//let response;
		//.lastIndexOf('/')
		//const dess_path = structjson.structProtoToJson();
		var arr = outputContexts.fields;
		var parameter;
		for(let context in arr){
			console.log(arr[context].name);
			//if(arr[context].name.stringValue === 'projects/autumn-it-week-2018/agent/sessions/7d0ec78ea1139d0a6d12170a9f32d323/contexts/work1_process_event'){
				parameter =structjson.structProtoToJson(arr[2].structValue.fields.parameters;
			//}
			//console.log(structjson.structProtoToJson(arr[2].structValue.fields.parameters));
		}
		for(let item in parameter){
			console.log(item);
		}
		var context;
		(outputContexts.fields).forEach(function (item, index, arr) {
			//if(outputContexts[index].name) {
				//context = outputContexts[2];
				console.log(item.structValue);
				console.log(JSON.stringify(item.structValue));
			//}
		})
		//console.log(JSON.stringify(context));
		//console.log(structjson.jsonToStructProto(context));
*/		
		
		
		
		
		return;
	},
	work2Process : function (parameter) {
		
		return;
	}
}
	

module.exports = evController;