// jscs:disable JS003
/**
 * @file
 * @author wufangjian
 */
/* eslint-disable max-params */
/* eslint-disable max-len */
/* eslint-disable fecs-camelcase */

(function (window, angular) {
    'use strict';

    angular
        .module('sspApp')
        .controller('ChannelCreateContr', channelCreateControl);

    channelCreateControl.$inject = ['$scope', '$stateParams', '$state', '$q', 'ChannelConstant', 'ChannelService', 'toastr'];

    function channelCreateControl($scope, $stateParams, $state, $q, ChannelConstant, ChannelService, toastr) {
        $scope.initData = {
            operaType: 'create',
            channelTypeList: ChannelConstant.channelTypeList,
            purchaseModeList: ChannelConstant.purchaseModeList
        };

        $scope.form = {
            channel: {},
            extra: {
                checkuname: null
            },
            getData: function () {
                return this.channel;
            },
            submit: function () {
                var self = this;
                var params = this.getData();
                return ChannelService.addChannelInfo(params).then(function (data) {
                    if (data.data && data.data.cid) {
                        toastr.info('新建渠道信息', '成功');
                        self.turnBack();
                    }
                });
            },
            turnBack: function () {
                $state.go('channel.list');
            }
        };

        $scope.validate = {
            channelName: function (cname) {
                var params = {
                    cid: $stateParams.cid,
                    cname: cname
                };
                var deferred = $q.defer();
                ChannelService.checkChannelName(params).then(function (response) {
                    if (response.data.fe && response.data.fe.flag) {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                    }
                    $scope.form.extra.checkuname = response.data.fe.flag;
                });
                return deferred.promise;
            }
        };
    }
})(window, window.angular);
