/**
 * @file 广告创意下线
 * @author: wufangjian@baidu.com
 */

/* eslint-disable max-params */
/* eslint-disable max-len */
/* eslint-disable fecs-camelcase */

(function (window, angular) {
    'use strict';

    angular
        .module('sspApp')
        .controller('MediaOfflineControl', MediaOfflineControl);

    MediaOfflineControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', 'MediaConstent', 'MediaService', 'toastr', 'ChannelService', 'SweetAlert'];

    function MediaOfflineControl($scope, $stateParams, $state, $location, $modal, MediaConstent, MediaService, toastr, ChannelService, SweetAlert) {
        var vm = this;
        vm.productList = MediaConstent.DATA.productList;
        vm.channelList = [];
        vm.data = {
            channelId: null,
            ideaKeyWord: null,
            productIds: null
        };
        vm.turnBack = turnBack;
        vm.submit = submit;

        getChannelList();

        // ==============================
        $scope.$watchCollection('vm.extra.productArr', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                vm.data.productIds = vm.extra.productArr.toString();
            }
        });

        function getChannelList() {
            return ChannelService.getChannelList({status: 1}).then(function (response) {
                if(response.data){
                    vm.channelList = response.data.concat({cid: "999", cname: "合约广告系统"});
                }
            });
        }

        function submit() {
            var params = vm.data;
            return MediaService.addIdeaShield(params).then(function (response) {
                if (response.data.errno === 0) {
                    SweetAlert.swal({
                        title: '设置成功，请去前端进行验证',
                        confirmButtonText: '确定'
                    }, function () {
                        turnBack();
                    });
                }
                else {
                    toastr.error(response.data.errmsg, '失败');
                }
            });
        }

        function turnBack() {
            vm.data = {};
            if (vm.extra && vm.extra.productArr) {
                vm.extra.productArr = [];
            }
        }
    }
})(window, window.angular);
