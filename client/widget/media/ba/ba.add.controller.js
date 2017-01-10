/**
 * @file 添加->吧广告屏蔽
 * @author: wufangjian@baidu.com
 */

/* eslint-disable max-params */
/* eslint-disable max-len */
/* eslint-disable fecs-camelcase */

(function (window, angular) {
    'use strict';

    angular
        .module('sspApp')
        .controller('MediaBaAddControl', MediaBaAddControl);

    MediaBaAddControl.$inject = ['$scope', '$stateParams', '$state', '$location', '$modal', 'MediaService', 'MediaConstent', 'toastr', 'Units'];

    function MediaBaAddControl($scope, $stateParams, $state, $location, $modal, MediaService, MediaConstent, toastr, Units) {
        var vm = this;
        var moment = window.moment;
        var forumName = null;

        vm.clientList = MediaConstent.DATA.clientList;
        vm.pageList = MediaConstent.DATA.pageList;
        vm.reasonList = MediaConstent.DATA.reasonList;
        vm.data = {};
        vm.extra = {};
        vm.submit = submit;
        vm.checkName = checkName;

        $scope.startDateOnSetTime = startDateOnSetTime;
        $scope.endDateOnSetTime = endDateOnSetTime;
        $scope.startDateBeforeRender = startDateBeforeRender;
        $scope.endDateBeforeRender = endDateBeforeRender;
        // ============================
        function startDateOnSetTime() {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime() {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender($dates) {
            var len = $dates.length;
            var ret = [];
            // 结束时间
            if (vm.data.shieldEndTime) {
                for (var i = 0; i < len; i++) {
                    if ($dates[i].localDateValue() >= moment(vm.data.shieldEndTime).valueOf() || $dates[i].localDateValue() <= moment(new Date)) {
                        ret.push($dates[i]);
                    }
                }
            }
            // 当前时间
            else {
                for (var j = 0; j < len; j++) {
                    if ($dates[j].localDateValue() <= moment(new Date)) {
                        ret.push($dates[j]);
                    }
                }
            }
            if (ret.length > 0) {
                setStartDateTime($dates, ret);
            }
        }

        function endDateBeforeRender($view, $dates) {
            var len = $dates.length;
            var ret = [];
            if (vm.data.shieldStartTime) {
                var maxTime = new Date(vm.data.shieldStartTime).getTime() + 1095 * 24 * 3600 * 1000;
                for (var i = 0; i < len; i++) {
                    if ($dates[i].localDateValue() <= moment(vm.data.shieldStartTime).valueOf() || $dates[i].localDateValue() >= maxTime) {
                        ret.push($dates[i]);
                    }
                }
            }
            else {
                for (var j = 0; j < len; j++) {
                    if ($dates[j].localDateValue() <= moment(new Date)) {
                        ret.push($dates[j]);
                    }
                }
            }
            setStartDateTime($dates, ret);
        }

        function setStartDateTime($dates, ret) {
            var len = $dates.length;
            var retLen = ret.length;
            if (len === 42) {
                retLen === 42 ? retLen = 42 : retLen = retLen - 1;

            }
            if (len === 24) {
                retLen === 24 ? retLen = 24 : retLen = retLen - 1;
            }

            for (var j = 0; j < retLen; j++) {
                ret[j].selectable = false;
            }
        }

        $scope.$watchCollection('vm.extra.clientArr', function (newvalue, oldvalue) {
            if (!newvalue || newvalue.length <= 0) {
                vm.extra.client = '';
            }
            else {
                vm.extra.client = true;
            }
        });

        $scope.$watchCollection('vm.extra.pageArr', function (newvalue, oldvalue) {
            if (!newvalue || newvalue.length <= 0) {
                vm.extra.page = '';
            }
            else {
                vm.extra.page = true;
            }
        });

        function submit() {
            var star = vm.data.shieldStartTime ? Units.formatTime(vm.data.shieldStartTime) : Units.formatTime(new Date());
            var end = vm.data.shieldEndTime ? Units.formatTime(vm.data.shieldEndTime) : -1;

            var params = {
                forumName: forumName,
                clientTypes: vm.extra.clientArr.toString(),
                pageTypes: vm.extra.pageArr.toString(),
                shieldStartTime: star,
                shieldEndTime: end
            };
            if (vm.extra.reason === 0) {
                params.reason = vm.extra.otherreason;
            }
            else {
                params.reason = MediaConstent.METHODS.adpReason(vm.extra.reason);
            }

            return MediaService.addBa(params).then(function (response) {
                var data = response.data.data.failedForumList;
                if (response.data.errno === 0) {
                    data && data.length > 0 ? toastr.error(data.toString() + ' 吧不存在', '') : toastr.info('添加吧广告屏蔽成功', '成功');
                    $state.go('media.ba');
                }
                else {
                    data && data.length > 0 ? toastr.error(data.toString() + ' 吧不存在', '失败') : toastr.error(response.data.errmsg, '失败');
                }
            });
        }

        function checkName(val) {
            if (!val) {
                return false;
            }

            var arr = val.split(',');
            var ret = [];
            var obj = {};

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] && !obj[arr[i]]) {
                    ret.push(arr[i]);
                    obj[arr[i]] = 1;
                }
            }

            if (ret.length > 100) {
                return false;
            }

            forumName = ret.toString();
            return true;
        }
    }
})(window, window.angular);
