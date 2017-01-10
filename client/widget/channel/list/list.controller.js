/**
 * @file
 * @author wufangjian
 */
/* eslint-disable max-params */
/* eslint-disable max-len */

(function (window, angular) {
    'use strict';

    angular
        .module('sspApp')
        .controller('ChannelListContr', channelListControl);

    channelListControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', 'ChannelConstant', 'ChannelService', 'toastr', 'Units'];

    function channelListControl($scope, $stateParams, $state, $location, $modal, ChannelConstant, ChannelService, toastr, Units) {
        var vm = this;
        var channelList = [];
        var pagination = {
            rp: $stateParams.rp || 20,
            page: $stateParams.page || 1
        };
        var query = {
            status: $stateParams.status || 0,
            cname: $stateParams.cname || ""
        }

        vm.statusList = ChannelConstant.statusList;
        vm.changeStatus = changeStatus;

        getChannelList();
        // ========================================

        // 表单
        vm.form = {
            params: {
                status: query.status,
                cname: query.cname
            },
            extra: {
                len: 0
            },
            getData: function () {
                return angular.extend({}, this.params);
            },
            reset: function () {
                this.params.status = 0;
                this.params.cname = null;
                this.submit();
            },
            submit: function () {
                var params = angular.extend({}, pagination, this.getData());
                return ChannelService.getChannelList(params).then(function (response) {
                    vm.gridApi.selection.clearSelectedRows();
                    channelList = response.data;
                    vm.gridOptions.data = response.data;
                    $location.search(params);
                    vm.ngstyle = Units.getTableStyle(vm.gridOptions);
                });
            }
        };
        

        function getChannelList () {
            return ChannelService.getChannelList(query).then(function(response) {
                channelList = response.data;
                vm.gridOptions.data = channelList;
                vm.ngstyle = Units.getTableStyle(vm.gridOptions);
            });
        }
        
        function changeStatus(status) {
            var msg = (parseInt(status, 10) === 1) ? '已启用' : '已冻结';
            var ret = [];
            var selectRows = vm.gridApi.selection.getSelectedRows();

            for (var i = 0; i < selectRows.length; i++) {
                var cid = selectRows[i] ? selectRows[i].cid : '';
                ret.push({
                    cid: cid,
                    status: status
                });
            }

            if (!ret || ret.length <= 0) {
                return false;
            }

            var params = {
                data: ret
            };

            return ChannelService.changeChannelStatus(params).then(function(response) {
                if (response.data && response.data.flag) {
                    toastr.info(msg, '成功');
                    vm.form.submit();
                } else {
                    toastr.info(msg, '失败');
                }
            });
        }

		// ======================================================
		// 组件
		// ======================================================
		// 分页信息
        vm.gridOptions = {
            data: channelList,
            enableSorting: false,
            enableGridMenu: true,
            headerRowHeight: 36,
            rowHeight: 40,
            enableHorizontalScrollbar: 1,
            enableVerticalScrollbar: 0,
            enableSelectAll: true,
            showGridFooter: true,

            // -------- 分页属性 ----------------
            enablePagination: true, // 是否分页，默认为true
            paginationPageSize: pagination.rp,
            paginationPageSizes: [20, 50, 100], // 每页显示个数可选项
            columnDefs: [
                {field: 'cid', name: '渠道ID'},
                {field: 'cname', name: '渠道名称'},
                {field: 'fe_status', name: '状态'},
                {field: 'fe_ctype', name: '渠道类型'},
                {field: 'fe_purchase_mode', name: '采购方式'},
                {field: 'cid', name: '操作', cellTemplate: __uri('./opera.tpl.html'), minWidth: 150}
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    pagination.page = newPage;
                    pagination.rp = pageSize;
                    vm.form.submit();
                });
            }
        };
    }
})(window, window.angular);
