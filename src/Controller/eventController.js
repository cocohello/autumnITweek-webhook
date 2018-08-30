/**
 * http://usejsdoc.org/
 */

const structjson = require('../Util/structjson');
const path = require('path');
const orchestrator = require('../Model/orchestrator');
const O = orchestrator({
	tenancyName: 'bibibot',                          	
	usernameOrEmailAddress: 'lee@bbnetwork.co.jp', 				
	password: 'bbn043_bbn043',
});

//sign in to Orchestrator and get token
//const token = O.login();

const evController = {
	work1Process : function (outputContexts) {
		//O.putAsset(token);
		//const config = require('../../resource/orchestrator_Environment');
		//const O = orchestrator(config);
		//let response;
		//.lastIndexOf('/')
		let dest_path;
		const arr = structjson.structProtoToJson(outputContexts);
		//var parameter = structjson.structProtoToJson(outputContexts)['2']['parameters']['0']['dest_path'];
		
		for(let context in arr){
			if(arr[context].name === 'projects/autumn-it-week-2018/agent/sessions/7d0ec78ea1139d0a6d12170a9f32d323/contexts/work1_process_event'){
				dest_path = arr[context];
			}
		}
		
		console.log(dest_path);
		/*for(let item in parameter){
			console.log(item);
		}
		var context;
		(outputContexts.fields).forEach(function (item, index, arr) {
			//if(outputContexts[index].name) {
				//context = outputContexts[2];
				console.log(item.structValue);
				console.log(JSON.stringify(item.structValue));
			//}
		})*/
		
		
		
		return;
	},
	work2Process : function (parameter) {
		
		return;
	}
}
	

module.exports = evController;