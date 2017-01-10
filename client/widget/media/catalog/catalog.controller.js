/**
 * @file 目录屏蔽
 * @author: wufangjian@baidu.com
 */

/* eslint-disable max-params */
/* eslint-disable max-len */
/* eslint-disable fecs-camelcase */

(function (window, angular) {
    'use strict';

    angular
        .module('sspApp')
        .controller('MediaCatalogControl', MediaCatalogControl);

    MediaCatalogControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', 'ChannelService', 'MediaService', 'toastr', 'Units'];

    function MediaCatalogControl($scope, $stateParams, $state, $location, $modal, ChannelService, MediaService, toastr, Units) {
        var vm = this;

        vm.alldir = [];
        vm.selectedPC = [];
        vm.selectedWAP = [];
        vm.selectedAPP = [];

        vm.data = {};
        vm.init = {};
        vm.submit = submit;

        getAllDir();
        getChooseDir();
        // ============================================================

        function getData() {
            var ret = [];
            var obj = {};
            vm.data = {
                pc: vm.selectedPC,
                wap: vm.selectedWAP,
                app: vm.selectedAPP
            };

            if (vm.data.pc.length >= 1) {
                obj = Units.adpSelectParam(vm.data.pc, vm.alldir);
                obj.type = 'pc';
                ret.push(obj);
            }
            if (vm.data.wap.length >= 1) {
                obj = Units.adpSelectParam(vm.data.wap, vm.alldir);
                obj.type = 'wap';
                ret.push(obj);
            }
            if (vm.data.app.length >= 1) {
                obj = Units.adpSelectParam(vm.data.app, vm.alldir);
                obj.type = 'app';
                ret.push(obj);
            }
            return ret.length === 0 ? false : ret;
        }

        function submit() {
            var data = getData();
            if (!data) {
                toastr.error('请选择目录', '提示');
                return;
            }
            MediaService.addCatalog(data).then(function (response) {
                if (response.data.errno === 0) {
                    toastr.info('吧目录屏蔽添加成功', '成功');
                }
                else {
                    toastr.error(response.errmsg, '失败');
                }
            });
        }

        function getAllDir() {
            var param = {
                product_id: 2
            };
            return ChannelService.getTiebaDir(param).then(function (response) {
                if (response.data && response.data.length >= 0) {
                    vm.init = {
                        dirPC: Units.cloneObj(response.data) || [],
                        dirWAP: Units.cloneObj(response.data) || [],
                        dirAPP: Units.cloneObj(response.data) || [],
                        flag: true
                    };
                    vm.alldir = response.data;
                }
            });
        }

        function getChooseDir() {
            return MediaService.selectCatalog({}).then(function (response) {
                if (response.data.errno === 0) {
                    var data = response.data.data;
                    for (var i = 0; i < data.length; i++) {
                        data[i].dirFirstId = data[i].dirFirstId ? data[i].dirFirstId : '';
                        data[i].dirSecondId = data[i].dirSecondId ? data[i].dirSecondId : '';

                        var str = (data[i].dirFirstId && data[i].dirSecondId) ? ',' : '';
                        var temp = (data[i].dirFirstId + str + data[i].dirSecondId).split(',');

                        if (temp && !temp[0]) {
                            continue;
                        }
                        if (data[i].type === 'pc') {
                            vm.selectedPC = temp;
                        }
                        else if (data[i].type === 'wap') {
                            vm.selectedWAP = temp;
                        }
                        else if (data[i].type === 'app') {
                            vm.selectedAPP = temp;
                        }
                    }
                }
            });
        }
    }
})(window, window.angular);

