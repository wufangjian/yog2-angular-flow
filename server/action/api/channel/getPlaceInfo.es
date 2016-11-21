/**
 * @des: 获取广告位信息
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */


'use strict';

import {INTERFACE} from '../../../interface';

export default (req, res, next) => {
	
	req.query.products =  input.adapterParam(req.query.products);
	req.query.platforms =  input.adapterParam(req.query.platforms);

    yog.ralPromise('SSPAPI', {
        path: INTERFACE._getPlaceInfo,
        data: req.query,
        method: 'post',
    }).then(function (response) {
    	let data = response.data;
        res.json(data);
    }, function (error) {
        res.json(error);
    });
};

let input = {
	adapterParam: function(arr){
		let result = arr;
		if(!(arr instanceof Array)){
			if(arr){
				result = [];
				result[0] = arr;
			}else{
				result = [];
			}
		}
		return result;
	}
};