/**
 * @des: 更改渠道状态信息
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */

'use strict';

import {INTERFACE} from '../../../interface';

export default (req, res, next) => {
	req.query.data = input.adapterParam(req.query.data);
    req.query.uname = req.session.username;

	yog.ralPromise('SSPAPI', {
		path: INTERFACE._changeChannelStatus,
		data: req.query
	}).then(function(response) {
		res.json(response.data);
	}, function(error) {
		res.json(error);
	});
};

// 输入数据匹配
let input = {
	adapterParam: function(arr) {
		let result = [];
		if (!(arr instanceof Array)) {
			if (arr) {
				result = [];
				result[0] = JSON.parse(arr);
			}
		} else {
			for (let i = 0, len = arr.length; i < len; i++) {
				result.push(JSON.parse(arr[i]));
			}
		}
		return result;
	}
};

// 输出数据匹配
let output = {
	adapterFlag: function(data) {
		let flag = false;
		if (data && data.success && data.success.lenghth > 0) {
			flag = true;
		}
		return flag;
	}
};