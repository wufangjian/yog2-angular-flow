(function (window, angular) {

    // 静态数据
    angular
        .module('sspApp')
        .constant('ChannelConstant', {
            // 渠道状态
            statusList: [
                {'status': '0', 'des': '全部'},
                {'status': '1', 'des': '启用中'},
                {'status': '2', 'des': '已停用'},
                {'status': '3', 'des': '保证金用完'}
            ],

            // 渠道列表 mock
            channelTypeList: [
                {'ctype': '1', 'des': '内部渠道'},
                {'ctype': '2', 'des': '外部渠道'},
                {'ctype': '3', 'des': 'GD'},
            ],

            //
            purchaseModeList: [
                {'purchase_mode': '1', 'des': 'RTB'},
                {'purchase_mode': '2', 'des': 'CPM'}
            ],
            adpChannelType: function (type) {
                var channelTypeList = this.channelTypeList;
                var des = des;
                for (var i = 0, len = channelTypeList.length; i < len; i++) {
                    if (channelTypeList[i].ctype === type.toString()) {
                        des = channelTypeList[i].des;
                        break;
                    }
                }
                return des;
            }
        });
})(window, window.angular);