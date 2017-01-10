/**
 * @file 广告位流量控制
 * @author: wufangjian@baidu.com
 */

/* eslint-disable max-params */
/* eslint-disable max-len */
/* eslint-disable fecs-camelcase */

(function (window, angular) {
    'use strict';

    angular.module('sspApp')
        .controller('ChannelFlowContr', channelFlowControl);

    channelFlowControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$uibModal', '$q', 'ChannelConstant', 'ChannelService', 'placeChannelInfo', 'toastr'];

    function channelFlowControl($scope, $stateParams, $state, $location, $uibModal, $q, ChannelConstant, ChannelService, placeChannelInfo, toastr) {

        // 初始化数据
        $scope.initData = {
            channelTypeList: ChannelConstant.channelTypeList,
            purchaseModeList: ChannelConstant.purchaseModeList,
            place_data: placeChannelInfo.place_data,
            platformsALL: placeChannelInfo.platforms, // 平台
            productsAll: placeChannelInfo.products || [], // 产品线
            productsSelect: placeChannelInfo.fe.selectProductList || []
        };

        // ======================================================
        // 组件 表格
        // ======================================================
        $scope.gridOptions = {
            enableSorting: false,
            enableGridMenu: true,
            headerRowHeight: 36,
            rowHeight: 85,
            enableHorizontalScrollbar: 1,
            enableVerticalScrollbar: 0,
            enableSelectAll: true,
            showGridFooter: true,
            minRowsToShow: (!$scope.initData.place_data || $scope.initData.place_data.length === 0) ? 1 : ($scope.initData.place_data.length),
            // -------- 分页属性 ----------------
            useExternalPagination: false,
            enablePagination: false, // 是否分页，默认为true
            enablePaginationControls: false, // 使用默认的底部分页
            columnDefs: [
                {field: 'place_name', name: '广告位名称'},
                {field: 'product_str', name: '产品线'},
                {field: 'platform_str', name: '所属平台'},
                {field: 'page_name', name: '所属页面'},
                {field: 'place_type', name: '广告位类型'},
                {field: '', name: '开关状态', cellTemplate: __uri('./switch.tpl.html'), minWidth: 125},
                {field: 'cpm_price', name: 'CPM价格', cellTemplate: __uri('./cpm.tpl.html'), minWidth: 110},
                {field: '', name: '内容定向', cellTemplate: __uri('./setdir.tpl.html'), minWidth: 80},
                {field: '', name: '请求流量控制', cellTemplate: __uri('./ctrflow.tpl.html'), minWidth: 150}
            ],
            onRegisterApi: function (gridApi) { 
                $scope.gridApi = gridApi;
            }
        };


        $scope.form = {
            // 表单数据
            flow: {
                cid: $stateParams.cid || null,
                cname: placeChannelInfo.cname || null,
                ctype: placeChannelInfo.ctype || null,
                purchase_mode: placeChannelInfo.purchase_mode,
                max_qps: placeChannelInfo.max_qps || null
            },
            // 复选框数据
            extra: {
                platformValue: placeChannelInfo.fe.selectPlateformList,
                productValue: placeChannelInfo.fe.selectProductList,
                lowpricebatch: placeChannelInfo.fe.checkInfo.lowprice,
                flag: placeChannelInfo.fe.checkInfo.flag
            },
            // 获取提交数据
            getParams: function () {
                var gridData = $scope.gridOptions.data;
                // ================================================
                // 注意: 删除$$hashKey 属性
                // ================================================

                for (var i = 0, len = gridData.length; i < len; i++) {
                    if (gridData[i].$$hashKey) {
                        delete gridData[i].$$hashKey;
                    }
                }

                var params = {
                    platforms: this.extra.platformValue,
                    products: this.extra.productValue
                };

                var data = angular.extend({}, this.flow, params, {place_datas: gridData});
                return data;
            },
            setQPS: function (value) {
                if (parseInt(value, 10) === -1) {
                    $scope.form.max_qps = -1;
                }
                else {
                    $scope.form.max_qps = 1;
                }
            },
            submit: function () {
                var self = this;
                var params = this.getParams();
                return ChannelService.placeChannelUpdate(params).then(function (response) {
                    if (parseInt(response.data.errno, 10) === 0) {
                        toastr.info('编辑广告位渠道信息', '成功');
                        self.turnBack();
                    } 
                    else {
                        toastr.error(response.data.errmsg, '失败');
                    }
                });
            },
            turnBack: function () {
                $state.go('channel.list', {status: $stateParams.status});
            }
        };

        $scope.getAsyncData = function () {
            var params = angular.extend({}, {
                cid: $stateParams.cid,
                platforms: $scope.form.extra.platformValue,
                products: $scope.form.extra.productValue
            });

            var timer = null;
            return ChannelService.getPlaceInfo(params).then(function (response) {
                // 这里有个坑 clear cache
                $scope.gridOptions.data = [];
                if (response.data.place_data) {
                    timer = setTimeout(function(){
                        $scope.initData.place_data = response.data.place_data;
                        $scope.gridOptions.data = response.data.place_data;
                    }, 0);
                }
            });
        };

        $scope.getAsyncData();
        // 监听
        $scope.$watchCollection('form.extra.productValue', function (newListValue, oldListValue) {
            if (newListValue !== oldListValue) {
                $scope.getAsyncData();
            }
        });

        $scope.$watchCollection('form.extra.platformValue', function (newListValue, oldListValue) {
            if (newListValue !== oldListValue) {
                $scope.getAsyncData();
            }
        });

        $scope.validate = {
            products: function ($val) {
                if ($val && $val.length > 0) {
                    return true;
                }
                return false;
            },
            lowPrice: function (entity, bidPrice) {
                var lowPrice = entity.fix_cpm_low_price;
                if (bidPrice === 0) {
                    return true;
                }
                if (lowPrice > bidPrice) {
                    return false;
                }
                return true;
            },
            checkAllLowPrice: function ($val){
                if(!$val){
                    return true;
                }
            }
        };
        $scope.units = {
            checkQps: function (qps) {
                if (!qps) {
                    $scope.form.flow.max_qps = 1;
                }
            },
            // 设置dir
            PoPsetDir: function (entity) {
                var place_id = entity.place_id;
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    windowClass: 'draggable',
                    templateUrl: __uri('../winpop/winpop.tpl.html'),
                    resolve: {
                        data: ['ChannelService', function (ChannelService) {
                            var params = {
                                product_id: entity.product_id
                            };
                            return ChannelService.getTiebaDir(params).then(function (response) {
                                if (response.data && response.data.length >= 0) {
                                    return {
                                        all_dir: response.data,
                                        place_name: entity.place_name,
                                        first_catalogs_ids: entity.first_catalogs_ids,
                                        second_catalogs_ids: entity.second_catalogs_ids
                                    };
                                }
                            });
                        }]
                    },
                    controller: 'WinPopControl'
                });

                modalInstance.result.then(function (result) {
                    var data = $scope.gridOptions.data;
                    for (var i = 0, len = data.length; i < len; i++) {
                        if (data[i].place_id === place_id) {
                            $scope.gridOptions.data[i].first_catalogs = result.first_catalogs;
                            $scope.gridOptions.data[i].second_catalogs = result.second_catalogs;
                            $scope.gridOptions.data[i].first_catalogs_ids = result.first_catalogs_ids;
                            $scope.gridOptions.data[i].second_catalogs_ids = result.second_catalogs_ids;
                        }
                    }
                });
            },

            // 批量设置
            PoPbatchSetPrice: function (){
                var self = this;
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    windowClass: 'draggable',
                    templateUrl: __uri('../winpop/batchsetprice.tpl.html'),
                    resolve: {
                        data: {
                            lowprice: $scope.form.extra.lowpricebatch
                        }
                    },
                    controller: 'BatchSetPriceControl'
                });

                modalInstance.result.then(function(result) {
                    //$scope.form.extra.lowpricebatch = result;
                    $scope.form.extra.flag = true;
                    self.updateRowCpmPrice(result);
                });
            },

            updateRowCpmPrice: function (lowpricebatch) {
                var data = $scope.gridOptions.data;
                for (var i = 0; i < data.length; i++) {
                    if (parseInt(data[i].status, 10) === 1) {
                        $scope.gridOptions.data[i].cpm_price = lowpricebatch;
                    }
                }
            },

            // 设置cpm
            setCpm: function (entity, val, lowval) {
                var number = this.getCurrentRowInfo(entity);

                if (val < lowval) {
                    $scope.gridOptions.data[number].cpm_price = lowval;
                }
                else if (val > 100) {
                    $scope.gridOptions.data[number].cpm_price = 100;
                }
                else {
                    $scope.gridOptions.data[number].cpm_price = val;
                }
            },

            // 设置开关
            setStatus: function (entity, status) {
                var number = this.getCurrentRowInfo(entity);
                if (parseInt($scope.gridOptions.data[number].status , 10) === status) {
                    $scope.gridOptions.data[number].status = status;
                    if($scope.form.flow.purchase_mode === 2){
                        $scope.gridOptions.data[number].cpm_price = null;
                    }
                }

                var obj = this.hasOpenStatus();
                $scope.form.extra.lowpricebatch = obj.lowprice;
                $scope.form.extra.flag = obj.flag;
            },

            // 设置流量
            setFlow: function (entity, qps_control) {
                var number = this.getCurrentRowInfo(entity);

                if ($scope.gridOptions.data[number].qps_control !== qps_control) {
                    $scope.gridOptions.data[number].qps_control = qps_control;
                }

                if ($scope.gridOptions.data[number].qps_control === 1) {
                    $scope.gridOptions.data[number].qps_percent = 1;
                }
            },
            // 设置流量百分比
            setQps_percent: function (entity, qps_percent) {
                var reg = /^[0-9]+(.[0-9]{1,2})?$/;
                var number = this.getCurrentRowInfo(entity);
                if (reg.test(qps_percent) && qps_percent > 0 && qps_percent <= 100) {
                    $scope.gridOptions.data[number].qps_percent = qps_percent;
                }
            },

            /**
             * 获取当前行number
             *
             * @des 获取当前行number
             * @param {Object} entity 当前行信息
             * @return {number} i
             **/
            getCurrentRowInfo: function (entity) {
                var data = $scope.gridOptions.data;
                for (var i = 0, len = data.length; i < len; i++) {
                    if (data[i].place_id === entity.place_id) {
                        return i;
                    }
                }
            },

            hasOpenStatus: function(){
                var result = [];
                var data = $scope.gridOptions.data;
                for (var i = 0; i < data.length; i++) {
                    if (parseInt(data[i].status, 10) === 1) {
                        result.push(data[i].fix_cpm_low_price);
                    }
                }

                var len = result.length;
                if(len === 0){
                    return {
                        flag: false,
                        lowprice: null
                    };
                }
                else if (len === 1) {
                    return {
                        flag: true,
                        lowprice: result[0]
                    };
                }
                
                for (var j = 0; j < len; j++) {
                    for (var k = j; k < len; k++) {
                        if (result[j] >= result[k]) {
                            var temp = result[j];
                            result[j] = result[k];
                            result[k] = temp;
                        }
                    }
                }
                return {
                    flag: true,
                    lowprice: result[len - 1]
                };
            },

            // [采购方式]后端只返回purchase_mode 的id 需要自己匹配展示信息
            adapterPurchase_mode: function (purchase_mode) {
                var des = null;
                for (var i = 0, len = ChannelConstant.purchaseModeList.length; i < len; i++) {
                    var temp = ChannelConstant.purchaseModeList[i].purchase_mode;
                    if (parseInt(purchase_mode, 10) === parseInt(temp, 10)) {
                        des = ChannelConstant.purchaseModeList[i].des;
                    }
                }
                return des;
            },

            // [渠道类型]后端只返回ctype 的id 需要自己匹配展示信息
            adapterCtype: function (ctype) {
                var des = null;
                for (var i = 0, len = ChannelConstant.channelTypeList.length; i < len; i++) {
                    var temp = ChannelConstant.channelTypeList[i].ctype;
                    if (parseInt(ctype, 10) === parseInt(temp, 10)) {
                        des = ChannelConstant.channelTypeList[i].des;
                    }
                }
                return des;
            },

            // 样式计算
            getTableStyle: function () {
                var length = (!$scope.gridOptions.data || ($scope.gridOptions.data && $scope.gridOptions.data.length === 0)) ? 1 : $scope.gridOptions.data.length;
                return {
                    height: (length * $scope.gridOptions.rowHeight + $scope.gridOptions.headerRowHeight) + 40 + 'px'
                };
            }
        };
    }

})(window, window.angular);
