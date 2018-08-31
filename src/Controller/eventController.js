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

const token = O.login();
const evController = {
	work1Process : async function (outputContexts) {
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
		
		const assetProperties = {};
		//condition to filter assets
		assetProperties['assetName'] = 'work1';
		//receipt folder path
		assetProperties['work1_OFolderPath'] = dest_path;
		//image file count
		assetProperties['work1_OImageCount'] = 1;//img_count
		//user name
		assetProperties['work1_ONameInfor'] = '社員A';//user_name
		
		
		
		/*	const makeRequest = async () => {
		  const value1 = await promise1()
		  const value2 = await promise2(value1)
		  return promise3(value1, value2)
		}*/
		
			const value1 = await O.getAsset(token, assetProperties);
			const value2 = await O.putAsset(value1);
			return console.log(2);
	},
	work2Process : function (parameter) {
		
		return;
	}
}
	

module.exports = evController;