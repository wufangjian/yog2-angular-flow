/**
 * @author wufangjian
 */
(function (window, angular) {
    'use strict';

    var sideNavData = [
        {name: '渠道管理', className: 'fa fa-list-alt', subNav: [
            {url: 'channel.list', name: '渠道列表'}
        ]},
        {name: '媒体保护', className: 'fa fa-list-alt', subNav: [
            {url: 'media.offline', name: '下线广告创意'},
            {url: 'media.catalog', name: '目录广告屏蔽'},
            {url: 'media.ba', name: '吧广告屏蔽'},
            {url: 'media.adclose', name: '广告关闭'}
        ]}
    ];

    angular
    	.module('sspApp')
    	.constant('sideNavConfig', sideNavData);
})(window, window.angular);
