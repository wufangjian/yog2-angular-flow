/**
 * @author wufangjian
 */
(function(window, angular) {
    'use strict';

    angular.module('sspApp')

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/channel/list');

        $stateProvider
        .state('channel', {
            url: '/channel',
            redirectTo: 'channel.list',
            data: {
                pageTitle: '渠道管理'
            },
            ncyBreadcrumb: {
                label: '渠道管理'
            },
        })

        .state('channel.list', {
            url: '/list?status&cname',
            views: {
                'main@': {
                    templateUrl: __uri('./channel/list/list.tpl.html'),
                    controller: 'ChannelListContr'
                }
            },
            data: {
                pageTitle: '渠道列表'
            },
            ncyBreadcrumb: {
                label: '渠道列表'
            },
            resolve: {
                channelList: ['ChannelService', '$stateParams', function(ChannelService, $stateParams) {
                    var params = {
                        status: $stateParams.status || 0,
                        cname: $stateParams.cname || ""
                    };

                    return ChannelService.getChannelList(params).then(function(response) {
                        return response.data;
                    });
                }]
            }
        })

        // 编辑渠道
        .state('channel.edit', {
            url: '/edit?cid',
            views: {
                'main@': {
                    templateUrl: __uri('./channel/common/form.tpl.html'),
                    controller: 'ChannelEditContr'
                }
            },
            data: {
                pageTitle: '新建渠道'
            },
            ncyBreadcrumb: {
                label: '新建渠道'
            },
            resolve: {
                channelInfo: ['ChannelService', '$stateParams', function(ChannelService, $stateParams) {
                    return ChannelService.getChannelInfo({
                        cid: $stateParams.cid
                    }).then(function(response) {
                        return response.data;
                    });
                }]
            }
        })

        // 创建渠道
        .state('channel.create', {
            url: '/create',
            views: {
                'main@': {
                    templateUrl: __uri('./channel/common/form.tpl.html'),
                    controller: 'ChannelCreateContr'
                }
            },
            data: {
                pageTitle: '新建渠道'
            },
            ncyBreadcrumb: {
                label: '新建渠道'
            }
        })

        // 流量
        .state('channel.flow', {
            url: '/flow?cid',
            views: {
                'main@': {
                    templateUrl: __uri('./channel/flow/flow.tpl.html'),
                    controller: 'ChannelFlowContr'
                }
            },
            data: {
                pageTitle: '流量控制'
            },
            ncyBreadcrumb: {
                label: '流量控制'
            },
            resolve: {
                placeChannelInfo: ['ChannelService', '$stateParams', function(ChannelService, $stateParams) {
                    var params = {
                        cid: $stateParams.cid
                    };
                    
                    return ChannelService.getPlaceChannelInfo(params).then(function(response) {
                        return response.data;
                    });
                }]
            }
        });
    });
})(window, window.angular);