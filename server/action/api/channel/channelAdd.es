/**
 * @des: 添加渠道信息
 * @author: wufangjian
 * @email: wufangjian@baidu.com
 * output: 输出数据格式匹配
 * data.fe: 前端适配的数据格式
 */

'use strict';

import {INTERFACE} from '../../../interface';
import {getData} from '../../../model/index';

export default (req, res, next) => {
    req.query.uname = req.session.username;
    yog.ralPromise('SSPAPI', {
        path: INTERFACE._addChannel,
        data: req.query
    }).then(function (response) {
        res.json(response.data);
    }, function (error) {
        res.json(error);
    });
};