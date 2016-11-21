/**
 * @des: 添加渠道信息
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */

'use strict';

import {INTERFACE} from '../../../interface';

export default (req, res, next) => {
    yog.ralPromise('SSPAPI', {
        path: INTERFACE._getChannelInfo,
        data: req.query
    }).then(function (response) {
    	let flag = output.adapterFlag(response.errno);
    	response.fe = {
    		flag : flag
    	}
        res.json(response.data);
    }, function (error) {
        res.json(error);
    });
};

let output = {
	adapterFlag: function(errno){
		if(errno != 7){
			return true;
		}
		return false;
	}
}