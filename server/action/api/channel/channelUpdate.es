/**
 * @des: 跟新渠道信息
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */

 
'use strict';

import {INTERFACE} from '../../../interface';

export default (req, res, next) => {
    // username op操作人
    req.body.params.uname = req.session.username;
    yog.ralPromise('SSPAPI', {
        path: INTERFACE._updateChannel,
        data: req.body.params,
        method: 'POST',
    }).then(function (response) {
    	var flag = output.adapterFlag(response.errno);
    	response.fe = {
    		flag: flag
    	};
        res.json(response);
    }, function (error) {
        res.json(error);
    });
};


let output = {
	adapterFlag: function(errno){
		if(errno == 0){
			return true;
		}
		return false;
	}
}