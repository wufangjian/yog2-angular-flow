/**
 * @file 渠道列表接口
 * @author wufangjian@baidu.com
 *
 */

(function (window, angular) {

    angular
        .module('sspApp')
        .service('MediaService', MediaService);

    MediaService.$inject = ['$http'];

    function MediaService($http) {
        // 获取目录屏蔽信息
        this.selectCatalog = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get('api/media/selectCatalog', config);
        };

        this.addCatalog = function (data, config) {
            config = config || {};
            config.params = data;
            return  $http.post('api/media/addCatalog', config);
        };

        this.selectBa = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get('api/media/selectBa', config);
        };

        this.addBa = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.post('api/media/addBa', config);
        };

        this.removeBa = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get('api/media/removeBa', config);
        };

        this.download = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get('api/media/download', config);
        };

        // 广告创意快速下线
        this.addIdeaShield = function (data, config) {
            config = config || {};
            config.params = data;
            return  $http.post('api/media/addIdeaShield', config);
        };

        // 广告关闭
        this.selectAdcloseList = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get('api/media/adcloseList', config);
        };

        // 设置广告关闭时间
        this.UpdateCloseTime = function (data, config) {
            config = config || {};
            config.params = data;
            return $http.get('api/media/adcloseUpdateCloseTime', config);
        }
    }

})(window, window.angular);
