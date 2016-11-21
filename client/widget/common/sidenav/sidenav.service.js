/**
 * @author wufangjian
 */
(function (window, angular) {
    'use strict';

    var sideNavData = [
        {name: '渠道管理', className: 'fa fa-list-alt', subNav: [
            {url: 'channel.list', name: '渠道列表'},
        ]}
    ];

    angular
    	.module('sspApp')
    	.constant('sideNavConfig', sideNavData);
})(window, window.angular);
