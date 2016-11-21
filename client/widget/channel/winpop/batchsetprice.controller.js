/**
 * @file 目录设置弹窗
 * @author: wufangjian@baidu.com
 */

/* eslint-disable max-params */
/* eslint-disable max-len */
/* eslint-disable fecs-camelcase */

(function (window, angular) {
    'use strict';

    angular
        .module('sspApp')
        .controller('BatchSetPriceControl', batchSetPriceControl);

    batchSetPriceControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', '$uibModalInstance', 'data'];

    function batchSetPriceControl($scope, $stateParams, $state, $location, $modal, $uibModalInstance, data) {

        $scope.initData = {
            lowprice: data.lowprice
        };


        $scope.form = {
            params: {
                // lowprice: null
            },
            submit: function () {
                var lowprice = this.params.lowprice;
                $uibModalInstance.close(lowprice);
            }
        };

        $scope.validate = {
            setLowPrice: function (val) {
                if (val < data.lowprice) {
                    return false;
                }
                return true;
            }
        };

        $scope.close = function () {
            $uibModalInstance.dismiss();
        };
    }
})(window, window.angular);
