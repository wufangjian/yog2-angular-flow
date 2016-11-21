/**
 * @file 编辑渠道信息
 * @authoer wufangjian@baidu.com
 */

/* eslint-disable max-params */
/* eslint-disable max-len */
/* eslint-disable fecs-camelcase */

(function (window, angular) {
    'use strict';

    angular
        .module('sspApp')
        .controller('ChannelEditContr', channelEditControl);

    channelEditControl.$inject = ['$scope', '$stateParams', '$state', '$q', 'ChannelConstant', 'ChannelService', 'channelInfo', 'toastr'];

    function channelEditControl($scope, $stateParams, $state, $q, ChannelConstant, ChannelService, channelInfo, toastr) {
        $scope.initData = {
            operaType: 'edit',
            channelTypeList: ChannelConstant.channelTypeList,
            purchaseModeList: ChannelConstant.purchaseModeList,
            cname: channelInfo.cname,
            purchase_mode: channelInfo.purchase_mode
        };
        channelInfo.month_deposit = parseInt(channelInfo.month_deposit, 10);

        $scope.form = {
            channel: channelInfo,
            extra: {
                checkuname: null
            },
            getData: function () {
                return this.channel;
            },
            submit: function () {
                var self = this;
                var params = angular.extend({}, this.getData(), {cid: $stateParams.cid});
                return ChannelService.channelUpdate(params).then(function (response) {
                    if (response.data && response.data.fe && response.data.fe.flag) {
                        toastr.info('编辑渠道信息', '成功');
                        self.turnBack();
                    }
                    else {
                        if (response.data.errno === 6) {
                            toastr.error('请先关闭该渠道下的全部广告位，再修改采购方式为固定CPM', '失败');
                        }
                    }
                });
            },
            turnBack: function () {
                $state.go('channel.list');
            }
        };

        $scope.$watch('form.channel.month_deposit', function (value) {

        });

        // 验证
        $scope.validate = {
            // 验证[渠道名称]
            channelName: function (cname) {
                var params = {
                    cid: $stateParams.cid,
                    cname: cname
                };

                var deferred = $q.defer();
                if ($scope.initData.cname === cname) {
                    $scope.form.extra.checkuname = true;
                    deferred.resolve();
                }
                else {
                    ChannelService.checkChannelName(params).then(function (response) {
                        if (response.data.fe && response.data.fe.flag) {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject();
                        }
                        $scope.form.extra.checkuname = response.data.fe.flag;
                    });
                }
                return deferred.promise;
            },

            // 验证[采购方式]
            channelPurchase_mode: function (purchase_mode) {
                if (parseInt($scope.initData.purchase_mode, 10) === 2 || parseInt(purchase_mode, 10) === 1) {
                    return true;
                }
                var params = {
                    cid: $stateParams.cid
                };

                var deferred = $q.defer();
                ChannelService.checkChannelPurchaseMode(params).then(function (response) {
                    if (response.data && response.data.fe && response.data.fe.flag) {
                        if (response.data.data.canRtbToCpm) {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject();
                        }
                    }
                });
                return deferred.promise;
            }
        };
    }
})(window, window.angular);
