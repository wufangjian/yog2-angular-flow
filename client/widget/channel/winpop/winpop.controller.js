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
        .controller('WinPopControl', winPopControl);

    winPopControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', '$uibModalInstance', 'data'];

    function winPopControl($scope, $stateParams, $state, $location, $modal, $uibModalInstance, data) {
        $scope.initData = {
            tiebaDirList: data.all_dir,
            place_name: data.place_name
        };

        $scope.selected = {
            selectedDir: adapterInitDir()
        };

        $scope.form = {
            submit: function () {
                var selected = $scope.selected.selectedDir;
                var output = $scope.adapterSelectDir(selected);
                $uibModalInstance.close(output);
            }
        };

        function adapterInitDir() {
            var firstArr = data.first_catalogs_ids ? data.first_catalogs_ids.split(',') : [];
            var secondArr = data.second_catalogs_ids ? data.second_catalogs_ids.split(',') : [];

            return firstArr.concat(secondArr);
        }

        $scope.adapterSelectDir = function (selected) {
            var first_catalogArr = [];
            var second_catalogArr = [];
            var first_catalogs_idArr = [];
            var second_catalogs_idArr = [];

            for (var i = 0, len = selected.length; i < len; i++) {
                if ((selected[i] + '').split('.').length > 1) {
                    second_catalogs_idArr.push(selected[i]);
                    var one = selected[i].split('.')[0];
                    var two = selected[i].split('.')[1];
                    var temp = data.all_dir[one - 1].dirName + ":" + data.all_dir[one - 1].children[two - 1].dirName;
                    second_catalogArr.push(temp);
                }
                else {
                    first_catalogs_idArr.push(selected[i]);
                    first_catalogArr.push(data.all_dir[selected[i] - 1].dirName);
                }
            }

            return {
                first_catalogs: first_catalogArr.toString(),
                second_catalogs: second_catalogArr.toString(),
                first_catalogs_ids: first_catalogs_idArr.toString(),
                second_catalogs_ids: second_catalogs_idArr.toString()
            };
        };

        $scope.close = function () {
            $uibModalInstance.dismiss();
        };
    }
})(window, window.angular);
