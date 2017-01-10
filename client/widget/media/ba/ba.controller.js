/**
 * @file 吧屏蔽
 * @author: wufangjian@baidu.com
 */

/* eslint-disable max-params */
/* eslint-disable max-len */
/* eslint-disable fecs-camelcase */

(function (window, angular) {
    'use strict';

    angular
        .module('sspApp')
        .controller('MediaBaControl', MediaBaControl);

    MediaBaControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', 'MediaConstent', 'MediaService', 'toastr', 'Units'];

    function MediaBaControl($scope, $stateParams, $state, $location, $modal, MediaConstent, MediaService, toastr, Units) {
        var vm = this;
        var gridData = [];
        var pagination = {pn: 1, sz: 10};

        vm.ngstyle = null;

        vm.data = {};
        vm.operate = {
            remove: remove,
            download: download
        };
        vm.getGridData = getGridData;
        vm.reset = reset;

        getGridData();
        // ============================

        function remove() {
            var rows = vm.gridApi.selection.getSelectedRows();
            var ret = [];
            for (var i = 0; i < rows.length; i++) {
                ret.push(rows[i].id + ':' + rows[i].forumName);
            }

            var param = {
                ids: ret.toString()
            };

            return MediaService.removeBa(param).then(function (response) {
                if (response.data.errno === 0) {
                    toastr.info('解除吧广告成功', '成功');
                    getGridData();
                }
                else {
                    toastr.error('解除吧广告失败', '失败');
                }
            });
        }

        function download() {
            window.location.href = 'http://comgd.baidu.com/beco/mideaProtect/downloadShieldForum';
        }

        function getGridData() {
            var params = angular.extend({}, pagination, vm.data);
            return MediaService.selectBa(params).then(function (response) {
                if (response.data.errno === 0) {
                    vm.gridOptions.totalItems = response.data.data.totalCount;
                    gridData = response.data.data.forumList;
                    vm.gridOptions.data = adpData(gridData);

                    vm.ngstyle = Units.getTableStyle(vm.gridOptions);
                    if (vm.gridApi) {
                        vm.gridApi.selection.clearSelectedRows();
                    }
                    $location.search(pagination);
                }
                else {
                    toastr.error(response.data.errmsg, '失败');
                }
            });
        }

        function reset() {
            vm.data.forumName = null;
            getGridData();
        }

        function adpData(data) {
            for (var i = 0; i < data.length; i++) {
                var clients = data[i].clientTypes;
                var pages = data[i].pageTypes;
                data[i].clientTypes = MediaConstent.METHODS.adpClient(clients);
                data[i].pageTypes = MediaConstent.METHODS.adpPage(pages);
            }
            return data;
        }

        vm.gridOptions = {
            data: gridData,
            enableSorting: false,
            enableGridMenu: true,
            headerRowHeight: 36,
            rowHeight: 40,
            enableHorizontalScrollbar: 1,
            enableVerticalScrollbar: 0,
            showGridFooter: true,
            enableSelectAll: true,

            // -------- 分页属性 ----------------
            enablePagination: true, // 是否分页，默认为true
            paginationPageSize: pagination.sz,
            paginationCurrentPage: pagination.pn,
            useExternalPagination: true,
            paginationPageSizes: [10, 50, 100], // 每页显示个数可选项
            columnDefs: [
                {field: 'forumName', name: '吧名'},
                {field: 'shieldStartTime', name: '开始屏蔽时间', minWidth: 150},
                {field: 'shieldEndTime', name: '结束屏蔽时间', minWidth: 150},
                {field: 'clientTypes', name: '屏蔽端'},
                {field: 'pageTypes', name: '屏蔽页面'},
                {field: 'reason', name: '屏蔽原因'},
                {field: 'opName', name: '操作人'},
                {field: 'opTime', name: '操作时间'}
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    pagination.pn = newPage;
                    pagination.sz = pageSize;
                    getGridData();
                });
            }
        };
    }
})(window, window.angular);
