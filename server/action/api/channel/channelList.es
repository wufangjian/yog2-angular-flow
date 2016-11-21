/**
 * @des: 渠道信息列表
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */


'use strict';

import {INTERFACE} from '../../../interface';
import {constantData} from '../../../model/constantData';

export default (req, res, next) => {
    yog.ralPromise('SSPAPI', {
        path: INTERFACE._listChannel,
        data: req.query
    }).then(function (response) {
    	let data = response.data;
    	data = output.adapterChannelType(data);
    	data = output.datapterPurchase(data);
    	data = output.adapterStatus(data);

        res.json(data);
    }, function (error) {
        res.json(error);
    });
};

// 输出数据匹配
let output = {
	adapterChannelType: function(arr){
		let list = constantData.channelTypeList;

		for(let i = 0, len = arr.length; i < len; i++){
			let temp = arr[i].ctype;

			for(let j = 0, jLen = list.length; j < jLen; j++){
				if(temp == list[j].ctype){
					arr[i].fe_ctype = list[j].des;
				}
			}
		}
		return arr;
	},

	datapterPurchase: function(arr){
		let list = constantData.purchaseModeList;
		for(let i = 0, len = arr.length; i < len; i++){
			let temp = arr[i].purchase_mode;
			for(let j = 0, jLen = list.length; j < jLen; j++){
				if(temp == list[j].purchase_mode){
					arr[i].fe_purchase_mode = list[j].des;
				}
			}
		}
		return arr;
	},

	adapterStatus: function(arr){
		let list = constantData.statusList;
		for(let i = 0, len = arr.length; i < len; i++){
			let temp = arr[i].status;
			for(let j = 0, jLen = list.length; j < jLen; j++){
				if(temp == list[j].status){
					arr[i].fe_status = list[j].des;
				}
			}
		}
		return arr;	
	}
}