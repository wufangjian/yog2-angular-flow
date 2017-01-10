/**
 * @file table 指令
 * @author: wufangjian@baidu.com
 */
(function (window, angular) {

    'use strict';
    angular.module('sspApp')
        .directive('tableModel', function () {
            return {
                restrict: 'AECM',
                replace: true,
                templateUrl: __uri('./table.tpl.html'),
                scope: {
                    data: '@data'
                },
                link: function (scope, elements, attrs) {
                    console.log(attrs);
                }
            };
        });
})(window, window.angular);