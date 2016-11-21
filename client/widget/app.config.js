/**
 * @author wufangjian
 */
(function (window, angular) {
    'use strict';

    var appConfig = {
        name: 'ssp',
        collapsed: false,
       	op: "wufangjian_test"
    };

    angular.module('sspApp')
    	.constant('appConfig', appConfig);
})(window, window.angular);