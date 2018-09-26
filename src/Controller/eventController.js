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
		let img_count = output['parameters']['0']['img_count'];
		let user_name = output['parameters']['0']['user_name'];
		//set asset value to the receipt folder path in orchestrator
		
		//UI Path//
		
		const assetProperties = {};
		//condition to filter assets
		assetProperties['assetName'] = 'work1';
		//receipt folder path
		assetProperties['work1_OFolderPath'] = dest_path;
		//image file count
		assetProperties['work1_OImageCount'] = img_count;
		//user name
		assetProperties['work1_ONameInfor'] = user_name;
		
		
			return token.then(result => {
				console.log(0);
				console.log(result);		
				return O.getAsset(result, assetProperties).then( result => {
					console.log(1);
					console.log(result);
					return O.putAsset(result, assetProperties).then( result => {
						console.log(2);
						console.log(result);
						return O.getReleaseId('assetTest').then( result => {
							console.log(3);
							console.log(result);
							return O.startJob(result).then( result => {
								console.log(4);
								console.log(result);
								return result;
							})
						})
					})
				})
			})
			
	},
	
	work2Process : function (outputContexts) {
		//get the receipt folder path from request query
		const arr = structjson.structProtoToJson(outputContexts);
		let output;
		for(let context in arr){
			let name = arr[context].name;
			if(name.substr(name.lastIndexOf('/')+1, name.length-1) === 'intent_work2-followup') { 
				output = arr[context]['parameters'];
			}
		}
		//let dest_path = output['parameters']['0']['dest_path'];
		console.log(output);
		
		//UI Path//
		const assetProperties = {};
		//condition to filter assets
		assetProperties['assetName'] = 'work2';
		//date period from stat
		assetProperties['work2_OPeriodRequested'] = `${output['date-period'][0].startDate}/${output['date-period'][0].endDate}`;
		//a type of stat
		assetProperties['work2_OStatisticRequested'] = output['work_2'][0];
		
		console.log(assetProperties);
				
			return token.then(result => {
				console.log(0);
				console.log(result);		
				return O.getAsset(result, assetProperties).then( result => {
					console.log(1);
					console.log(result);
					return O.putAsset(result, assetProperties).then( result => {
						console.log(2);
						console.log(result);
						return O.getReleaseId('test_get_request').then( result => {
							console.log(3);
							console.log(result);
							return O.startJob(result).then( result => {
								console.log(4);
								console.log(result);
								return result;
							})
						})
					})
				})
			})
			
	},
	
	robot_finished : function () {
		return ;
	}
}
	

module.exports = evController;