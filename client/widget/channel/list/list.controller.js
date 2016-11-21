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

    channelListControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', 'ChannelConstant', 'ChannelService', 'channelList', 'toastr'];

    function channelListControl($scope, $stateParams, $state, $location, $modal, ChannelConstant, ChannelService, channelList, toastr) {

        // 初始化数据
        $scope.initData = {
            statusList: ChannelConstant.statusList,
            channelList: channelList
        };

        var pagination = {
            rp: $stateParams.rp || 20,
            page: $stateParams.page || 1
        };

		// 表单
        $scope.form = {
            params: {
                status: $stateParams.status || 0,
                cname: $stateParams.cname || null
            },
            extra: {
                len: 0
            },
            getData: function () {
                return angular.extend({}, this.params);
            },
            submit: function () {
                var params = angular.extend({}, pagination, this.getData());
                return ChannelService.getChannelList(params).then(function (response) {
                    $scope.initData.channelList = response.data;
                    $scope.gridOptions.data = response.data;
                    $location.search(params);

                    $scope.gridApi.selection.clearSelectedRows();
                });
            }
        };

        $scope.units = {
            adapter: function (data) {

            },
            watchStatus: function (status) {
                var flag = false;

                if ($stateParams.status === status) {
                    flag = true;
                }
                return flag;
            },
            // 启动
            changeStatus: function (status) {
                var msg = (parseInt(status, 10) === 1) ? '已启用' : '已冻结';
                var result = [];
                var selectRows = $scope.gridApi.selection.getSelectedRows();

                for (var i = 0; i < selectRows.length; i++) {
                    var cid = selectRows[i] ? selectRows[i].cid : '';
                    result.push({cid: cid, status: status});
                }

                if (!result || result.length <= 0) {
                    return false;
                }

                var params = {
                    data: result
                };

                return ChannelService.changeChannelStatus(params).then(function (response) {
                    if (response.data && response.data.flag) {
                        toastr.info(msg, '成功');
                        $scope.form.submit();
                    }
                });
            },

            // 流量路由
            operaRoute: function (entity, type) {
                var cid = entity.cid;

                // 编辑
                if (parseInt(type, 10) === 1) {
                    $state.go('channel.edit', {cid: cid});
                }
                // 流量控制
                else if (parseInt(type, 10) === 2) {
                    $state.go('channel.flow', {cid: cid});
                }
            },
            getTableStyle: function () {
                var length = $scope.gridOptions.data.length;
                return {
                    height: (length * $scope.gridOptions.rowHeight + $scope.gridOptions.headerRowHeight) + 70 + 'px'
                };
            }
        };

		// ======================================================
		// 组件
		// ======================================================
		// 分页信息

        $scope.gridOptions = {
            data: $scope.initData.channelList,
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
                $scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    pagination.page = newPage;
                    pagination.rp = pageSize;
                    $scope.form.submit();
                });
            }
        };
    }
})(window, window.angular);
