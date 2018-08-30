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

const token = O.login().then(result => {
	return result;
});
console.log('eve'+token);
const evController = {
	work1Process : function (outputContexts) {
		//get the receipt folder path from request query
		const arr = structjson.structProtoToJson(outputContexts);
		let output;
		
		for(let context in arr){
			let name = arr[context].name;
			if(name.substr(name.lastIndexOf('/')+1, name.length-1) === 'work1_process_event') { 
				output = arr[context];
			}
		}
		
		let dest_path = output['parameters']['0']['dest_path'];
		console.log(dest_path);
		//set asset value to the receipt folder path in orchestrator
		
		//UI Path//
		O.getAsset(token, 'work1');
		
		//O.putAsset(token, );
		//const config = require('../../resource/orchestrator_Environment');
		//const O = orchestrator(config);
		//let response;
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