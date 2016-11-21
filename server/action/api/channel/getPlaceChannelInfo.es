/**
 * @des: 获取渠道信息
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */

'use strict';

import {INTERFACE} from '../../../interface';

export default (req, res, next) => {
    yog.ralPromise('SSPAPI', {
        path: INTERFACE._getPlaceChannelInfo,
        data: req.query
    }).then(function (response) {
    	let errno = response.errno;
    	let data = response.data;
    	if(errno == 0){
    		data.fe = {
	    		selectPlateformList: output.getPlatformSelect(data.platforms),
	    		selectProductList: output.getProductsSelect(data.products),
	    		checkInfo: output.getAllLowPrice(data.place_data)
	    	};
    	}
        res.json(data);
    }, function (error) {
        res.json(error);
    });
};


// 适配输出数据
let output = {
	// 获取选择的平台
	getPlatformSelect: function(arr){
		if(!arr || arr.length <= 0){
			return [];
		}

		let result = [];
		for(let i = 0, len = arr.length; i < len; i++){
			if(arr[i].status == 1){
				result.push(arr[i].value)
			}
		}
		return result;
	},

	// 获取选择的产品线
	getProductsSelect: function(arr){
		if(!arr || arr.length <= 0){
			return [];
		}
		let result = [];
		for(let i = 0, len = arr.length; i < len; i++){
			if(arr[i].status == 1){
				result.push(arr[i].value)
			}
		}
		return result;
	},

	// 获取底价
	getAllLowPrice: function(arr){
		if(!arr || arr.length <= 0){
			return false;
		}

		let result = [];
		for(let i = 0; i < arr.length; i++){
			if(arr[i].status == 1){
				result.push(arr[i].fix_cpm_low_price);
			}
		}

		if(result.length === 0){
			return {
				flag: false,
				lowprice: null
			}
		}

		let len = result.length;
		for(let j = 0; j < len; j++){
			for(let k = j; k < len; k++){
				if(result[j]*100 > result[k]*100){
					let temp = result[j];
					result[j] = result[k];
					result[k] = temp;
				}
			}
		}
		return {
			flag: true,
			lowprice: result[len - 1]
		};
	},
	addOldLowPrice: function (data) {
		var place_data = data.place_data;
		for(var i = 0; i < place_data.length; i++){
			place_data[i].old_cpm_low_price = place_data[i].fix_cpm_low_price
		}
		data.place_data = place_data;
		return data;
	}
}


