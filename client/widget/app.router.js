/**
 * @file 路由
 * @author: wufangjian@baidu.com
 */

(function (window, angular) {
    'use strict';

    angular.module('sspApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/channel/list');

        $stateProvider
        .state('channel', {
            url: '/channel',
            redirectTo: 'channel.list',
            data: {pageTitle: '渠道管理'},
            ncyBreadcrumb: {label: '渠道管理'}
        })
        .state('channel.list', {
            url: '/list?status&cname',
            views: {
                'main@': {
                    templateUrl: __uri('./channel/list/list.tpl.html'),
                    controller: 'ChannelListContr',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: '渠道列表'
            },
            ncyBreadcrumb: {
                label: '渠道列表'
            }
        })
        .state('channel.edit', {
            url: '/edit?cid',
            views: {
                'main@': {
                    templateUrl: __uri('./channel/common/form.tpl.html'),
                    controller: 'ChannelEditContr'
                }
            },
            data: {pageTitle: '新建渠道'},
            ncyBreadcrumb: {label: '新建渠道'},
            resolve: {
                channelInfo: ['ChannelService', '$stateParams', function (ChannelService, $stateParams) {
                    return ChannelService.getChannelInfo({
                        cid: $stateParams.cid
                    }).then(function (response) {
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
            data: {pageTitle: '新建渠道'},
            ncyBreadcrumb: {label: '新建渠道'}
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
            data: {pageTitle: '流量控制'},
            ncyBreadcrumb: {label: '流量控制'},
            resolve: {
                placeChannelInfo: ['ChannelService', '$stateParams', function (ChannelService, $stateParams) {
                    var params = {
                        cid: $stateParams.cid
                    };
                    return ChannelService.getPlaceChannelInfo(params).then(function (response) {
                        return response.data;
                    });
                }]
            }
        })
        .state('media', {
            url: '/media',
            redirectTo: 'media.offline',
            data: {pageTitle: '媒体保护'},
            ncyBreadcrumb: {label: '媒体保护'}
        })

        .state('media.offline', {
            url: '/offline',
            views: {
                'main@': {
                    templateUrl: __uri('./media/offline/form.tpl.html'),
                    controller: 'MediaOfflineControl as vm'
                }
            },
            data: {pageTitle: '下线广告创意'},
            ncyBreadcrumb: {label: '下线广告创意'}
        })

        .state('media.ba', {
            url: '/ba',
            views: {
                'main@': {
                    templateUrl: __uri('./media/ba/ba.tpl.html'),
                    controller: 'MediaBaControl',
                    controllerAs: 'vm'
                }
            },
            data: {pageTitle: '吧广告屏蔽'},
            ncyBreadcrumb: {label: '吧广告屏蔽'}
        })

        .state('media.ba.add', {
            url: '/add',
            views: {
                'main@': {
                    templateUrl: __uri('./media/ba/form.tpl.html'),
                    controller: 'MediaBaAddControl as vm'
                }
            },
            data: {pageTitle: '添加吧广告屏蔽'},
            ncyBreadcrumb: {label: '添加吧广告屏蔽'}
        })

        .state('media.catalog', {
            url: '/catalog',
            views: {
                'main@': {
                    templateUrl: __uri('./media/catalog/catalog.tpl.html'),
                    controller: 'MediaCatalogControl',
                    controllerAs: 'catalog'
                }
            },
            data: {pageTitle: '目录广告屏蔽'},
            ncyBreadcrumb: {label: '目录广告屏蔽'}
        })
        .state('media.adclose', {
            url: '/adclose',
            views: {
                'main@': {
                    templateUrl: __uri('./media/adclose/list.tpl.html'),
                    controller: 'MediaAdcloseListControl as vm'
                }
            },
            data: {pageTitle: '广告关闭'},
            ncyBreadcrumb: {label: '广告关闭'}
        });
    });
})(window, window.angular);
