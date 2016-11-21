/**
 * @des: 获取贴吧目录接口
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */

'use strict';

import {INTERFACE} from '../../../interface';

export default (req, res, next) => {
    yog.ralPromise('SSPAPI', {
        path: INTERFACE._getTiebaDir,
        data: req.query
    }).then(function (response) {
    	// 数据匹配
    	// let result = response.output.all_dir;
    	// result.push({
    	// 	level_1_name:"其他2",
    	// 	level_2_name: ['其他2']
    	// });
    	// response.output.all_dir = result;
    	//res.json(response);
    	//response.output.fe = output.adapterDir(response.output.all_dir);
        res.json(response.data);
    }, function (error) {
        res.json(error);
    });
};


let output = {
	adapterDir: function(arr){
		let result = [];
		for(let i = 0, len = arr.length; i < len; i++){
			let children = [];
			for(let j = 0, jLen = arr[i].level_2_name.length; j < jLen; j++){
				children.push({
					dirName: arr[i].level_2_name[j],
					dirType: 2,
					dirId: (i+1) + "." + (j+1),
					parentId: 1,
					children: null
				});
			}

			let temp = {
				dirName: arr[i].level_1_name,
				dirId: i + 1 + "",
				dirType: 1,
				parentId: -1,
				children: children
			};
			result.push(temp);
		}
		return result;
	}
}