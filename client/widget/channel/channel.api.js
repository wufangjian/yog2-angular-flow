/**
 * @file 接口映射文件
 * @author wufangjian@baidu.com
 */

/* eslint-disable fecs-camelcase */

(function (window, angular) {
    angular
        .module('sspApp')
        .constant('API', {
            _channelAdd: 'api/channel/channelAdd', // 1.添加渠道接口 tc.service.tieba.baidu.com/service/adsense/?method=addChannel
            _channelUpdate: 'api/channel/channelUpdate', // 2.修改渠道接口 tc.service.tieba.baidu.com/service/adsense/?method=updupdateChannel
            _channelList: 'api/channel/channelList', // 3.渠道列表接口 tc.service.tieba.baidu.com/service/adsense/?method=listChannel
            _changeChannelStatus: 'api/channel/changeChannelStatus', // 4.变更渠道状态接口 tc.service.tieba.baidu.com/service/adsense/?method=changeChannelStatus
            _getPlaceChannelInfo: 'api/channel/getPlaceChannelInfo', // 获取渠道广告位信息接口  tc.service.tieba.baidu.com/service/adsense/?method=getChannelInfo
            _getPlaceInfo: 'api/channel/getPlaceInfo', // '获取广告位信息接口' tc.service.tieba.baidu.com/service/adsense/?method=getPlcaceInfoByParams
            _byplaceid_channel: 'api/channel/byplaceid-channel', // 根据广告位id以及吧目录获取渠道RTB信息  tc.service.tieba.baidu.com/service/adsense/?method=getChannelByPlaceId
            _checkChannelName: 'api/channel/checkChannelName',
            _getChannelInfo: 'api/channel/getChannelInfo',
            _getTiebaDir: 'api/channel/getTiebaDir', // 获取贴吧目录接口
            _updatePlaceChannel: 'api/channel/placeChannelInfoUpdate', // 更新广告位渠道信息
        });
})(window, window.angular);