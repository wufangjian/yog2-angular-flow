/**
 * @file APP-SSP
 * @author wufangjian
 */

(function (window, angular) {
    'use strict';
    var appConfig = {
        name: 'ssp',
        collapsed: false
    };

    angular.module('sspApp')
        .constant('appConfig', appConfig);
})(window, window.angular);
