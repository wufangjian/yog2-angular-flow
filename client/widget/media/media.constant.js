/**
 * @file media静态数据
 * @author: wufangjian@baidu.com
 */
(function (window, angular) {

    var MediaConstent = {
        DATA: {
            clientList: [
                {type: 0, text: 'pc'},
                {type: 1, text: 'wap-ios'},
                {type: 2, text: 'wap-android'},
                {type: 3, text: 'app-ios'},
                {type: 4, text: 'app-android'}
            ],
            pageList: [
                {type: 3, text: '列表页'},
                {type: 4, text: '内容页'},
                {type: 6, text: '看图页'}
            ],
            reasonList: [
                {type: 1, text: '官方吧'},
                {type: 2, text: '承包吧'},
                {type: 3, text: '病种吧'},
                {type: 0, text: '自定义'}
            ],
            productList: [
                {type: 2, text: '百度贴吧'},
                {type: 8, text: '手机百度'},
                {type: 17, text: '贴吧框结合版'}
            ],
            factorList: [
                {type: 1, text: '广告元素'},
                {type: 2, text: '广告主'},
                {type: 3, text: '广告行业'}
            ]
        },
        METHODS: {
            adpClient: function (clientTypes) {
                var str = typeof clientTypes === 'string'
                    ? clientTypes : clientTypes.toString();
                var arr = str.split(',');
                var client = MediaConstent.DATA.clientList;
                var ret = [];

                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < client.length; j++) {
                        if (parseInt(arr[i], 10) === client[j].type) {
                            ret.push(client[j].text);
                        }
                    }
                }

                return ret.toString();
            },
            adpPage: function (pageTypes) {
                var str = typeof pageTypes === 'string'
                    ? pageTypes : (pageTypes instanceof Array) === true ? pageTypes.toString() : '';
                var arr = str.split(',');
                var page = MediaConstent.DATA.pageList;
                var ret = [];

                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < page.length; j++) {
                        if (parseInt(arr[i], 10) === page[j].type) {
                            ret.push(page[j].text);
                        }
                    }
                }

                return ret.toString();
            },
            adpReason: function (type) {
                var reasonList = MediaConstent.DATA.reasonList;
                for (var i = 0; i < reasonList.length; i++) {
                    if (reasonList[i].type === type) {
                        return reasonList[i].text;
                    }
                }
            },
            adpProduct: function (productId) {
                var productList = MediaConstent.DATA.productList;
                var flag = false;
                for (var i = 0, len = productList.length; i < len; i++) {
                    if (productList[i].type === productId) {
                        flag = true;
                        return productList[i].text;
                    }
                }
                if (!flag) {
                    return productId;
                }
            },
            adpFactor: function (factorTypes) {
                var str = typeof factorTypes === 'string'
                    ? factorTypes : (factorTypes instanceof Array) === true ? factorTypes.toString() : '';
                var arr = str.split(',');
                var factorList = MediaConstent.DATA.factorList;
                var ret = [];

                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < factorList.length; j++) {
                        if (parseInt(arr[i], 10) === factorList[j].type) {
                            ret.push(factorList[j].text);
                        }
                    }
                }

                return ret.toString();
            }
        }
    };
    // 静态数据
    angular
        .module('sspApp')
        .constant('MediaConstent', MediaConstent);
})(window, window.angular);
