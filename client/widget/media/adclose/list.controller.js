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
        .controller('MediaAdcloseListControl', MediaAdcloseListControl);

    MediaAdcloseListControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', 'MediaConstent', 'ChannelConstant', 'MediaService', 'toastr', 'Units', 'SweetAlert'];

    function MediaAdcloseListControl($scope, $stateParams, $state, $location, $modal, MediaConstent, ChannelConstant, MediaService, toastr, Units, SweetAlert) {
        var vm = this;
        var gridData = [];
        var pagination = {
            sz: 10,
            pn: 1
        };

        vm.productList = MediaConstent.DATA.productList;
        vm.data = {
            productId: null,
            channelName: null
        };
        vm.submit = getGridData;
        vm.reset = reset;

        //=======================================================================
        getGridData();

        function getGridData() {
            var params = angular.extend({}, pagination, vm.data);
            return MediaService.selectAdcloseList(params).then(function (response) {
                if (response.data.errno === 0) {
                    vm.gridOptions.totalItems = response.data.data.totalCount;
                    gridData = response.data.data.adcloseList;
                    vm.gridOptions.data = adpData(gridData);
                    vm.ngstyle = Units.getTableStyle(vm.gridOptions);
                    $location.search(pagination);
                }
            });
        }

        function reset() {
            pagination = {
                sz: 10,
                pn: 1
            };
            vm.data = {};
            getGridData();
        }

        function adpData(data) {
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].fe_clientType = MediaConstent.METHODS.adpClient(data[i].clientType);
                data[i].fe_productId = MediaConstent.METHODS.adpProduct(data[i].productId);
                data[i].fe_channelType = ChannelConstant.adpChannelType(data[i].channelType);
            }
            return data;
        }
        
        function updateUICloseTime(id, number) {
            var data = vm.gridOptions.data;
            for(var i = 0, len = data.length; i < len; i++){
                if(data[i].id === id){
                    vm.gridOptions.data[i].closeTime = number;
                    break;
                }
            }
        }

        $scope.setCloseTime = function (row) {
            var entity = row.entity;
            SweetAlert.swal({
                title: '请输入关闭时间',
                type: 'input',
                inputType: 'number',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showCancelButton: true,
                closeOnConfirm: false
            }, function (number) {
                var number = number;
                if (!/^[1-9]\d*$/.test(number)) {
                    swal.showInputError('请输入大于0的正整数');
                    return false;
                }
                var params = {
                    closeTime: number,
                    id: entity.id
                };
                MediaService.UpdateCloseTime(params).then(function (response) {
                    if (response.data.errno === 0) {
                        updateUICloseTime(entity.id, number);
                        SweetAlert.swal("成功", "广告关闭时间设置为" + number + "天", "success");
                    } else {
                        SweetAlert.swal("失败", "广告关闭时间设置为" + number + "天", "error");
                    }
                });
            });
        };

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
                {field: 'fe_productId', name: '产品线'},
                {field: 'fe_clientType', name: '端'},
                {field: 'channelName', name: '渠道名称'},
                {field: 'fe_channelType', name: '渠道类型', minWidth: 150},
                {field: 'channelName', name: '操作', cellTemplate: __uri('./operation.tpl.html')}
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
