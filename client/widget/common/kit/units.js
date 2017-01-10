/**
 * @file 工具方法 1.js工具方法  2.数据适配
 * @author wufangjian
 */
/* eslint-disable max-params */
/* eslint-disable max-len */

(function(window, angular) {
    'use strict';
    var Units = {
        /**
         * @params obj
         *
         * @des 深度拷贝
         */
        cloneObj: function (obj) {
            var str, newobj = obj.constructor === Array ? [] : {};
            if (typeof obj !== 'object') {
                return;
            } else if (window.JSON) {
                str = JSON.stringify(obj); //系列化对象
                newobj = JSON.parse(str); //还原
            } else {
                for (var i in obj) {
                    newobj[i] = typeof obj[i] === 'object' ?
                        this.cloneObj(obj[i]) : obj[i];
                }
            }
            return newobj;
        },

        /**
         * @params sdir adir
         *
         * @des 适配 [已选择目录] 的 [目录id]
         */
        adpSelectParam: function (sdir, adir) {
            var fIdArr = [];
            var sIdArr = [];
            var fNameArr = [];
            var sNameArr = [];

            for (var i in sdir) {
                var flag = sdir[i].split('.') && sdir[i].split('.').length === 1;
                flag ? fIdArr.push(sdir[i]) : sIdArr.push(sdir[i]);
                for (var j in adir) {
                    if (flag && adir[j].dirId == sdir[i]) {
                        fNameArr.push(adir[j].dirName);
                    } else if (!flag && sdir[i].split('.')[0] == adir[j].dirId) {
                        for (var k in adir[j].children) {
                            if (sdir[i].split('.')[1] == adir[j].children[k].dirId.split('.')[1]) {
                                sNameArr.push(adir[j].dirName + ":" + adir[j].children[k].dirName);
                            }
                        }
                    }
                }
            }

            var ret = {
                dirFirstId: fIdArr.toString(),
                dirSecondId: sIdArr.toString(),
                dirFirstName: fNameArr.toString(),
                dirSecondName: sNameArr.toString(),
            };

            return ret;
        },

        /**
         * @params gridOptions
         *
         * @des 重置table高度
         */
        getTableStyle: function (gridOptions) {
            var length = gridOptions.data.length;
            return {
                height: (length * gridOptions.rowHeight + gridOptions.headerRowHeight) + 70 + 'px'
            };
        },
        formatTime: function (time) {
            var ret = time && time.getTime ? time.getTime()/1000: time;
            return parseInt(ret);
        }
    };

    angular
        .module('sspApp')
        .constant('Units', Units);
})(window, window.angular);