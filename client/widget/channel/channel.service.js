/**
 * @file 渠道列表接口
 * @author wufangjian@baidu.com
 *
 */

(function (window, angular) {

    angular
        .module('sspApp')
        .service('ChannelService', channelService);

    channelService.$inject = ['$http', 'API'];

    function channelService($http, API) {
        // 获取列表
        this.getChannelList = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get(API._channelList, config);
        };

        this.addChannelInfo = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get(API._channelAdd, config);
        };

        this.changeChannelStatus = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get(API._changeChannelStatus, config);
        };

        this.getPlaceChannelInfo = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get(API._getPlaceChannelInfo, config);
        };


        this.getPlaceInfo = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get(API._getPlaceInfo, config);
        };


        this.checkChannelName = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get(API._checkChannelName, config);
        };

        this.getChannelInfo = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get(API._getChannelInfo, config);
        };

        this.channelUpdate = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.post(API._channelUpdate, config);
        };

        this.getTiebaDir = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get(API._getTiebaDir, config);
        };

        this.placeChannelUpdate = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.post(API._updatePlaceChannel, config);
        };

        // 验证采购方式
        this.checkChannelPurchaseMode = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get('api/channel/checkChannelPurchaseMode', config);
        };
    }

})(window, window.angular);
