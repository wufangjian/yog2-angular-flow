/**
 * @des: 更新新广告位渠道信息
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */

 
'use strict';

import {INTERFACE} from '../../../interface';

export default (req, res, next) => {
    req.body.params.uname = req.session.username;
    yog.ralPromise('SSPAPI', {
        path: INTERFACE._updatePlaceChannel,
        data: req.body.params,
        method: 'POST',
    }).then(function (response) {
        res.json(response);
    }, function (error) {
        res.json(error);
    });
};