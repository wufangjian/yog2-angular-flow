/**
 * @file APP-SSP
 * @author wufangjian
 */
(function (window, angular) {
    'use strict';

    function initGdApp($rootScope, $state, $stateParams, appConfig, i18nService) {
        i18nService.setCurrentLang('zh-cn');

        $rootScope.toggleNav = function () {
            $rootScope.appConfig.collapsed = !$rootScope.appConfig.collapsed;
        };
        $rootScope.$state = $state;
        $rootScope.appConfig = appConfig;
        $rootScope.$stateParams = $stateParams;


        $rootScope.$on('$routeChangeSuccess', function (current, $route) {
            $rootScope.pageTitle = $route.current.data.pageTitle;
        });

        $rootScope.$on('$stateChangeStart', function (evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params);
            }
        });
    }

    initGdApp.$inject = ['$rootScope', '$state', '$stateParams', 'appConfig', 'i18nService'];

    angular.module('sspApp', [
        'ui.router',
        'ngSanitize',
        'ncy-angular-breadcrumb',
        'mgcrea.ngStrap',
        'smart-table',
        'ui.grid',
        'ui.grid.cellNav',
        'ui.grid.treeView',
        'ui.grid.pagination',
        'ui.grid.resizeColumns',
        'ui.grid.autoResize',
        'ui.grid.selection',
        'ui.grid.saveState',
        'ui.select',
        'ui.grid.pagination',
        'ngAutodisable',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        'checklist-model', // checkbox
        'DualMultiSelect', // 多选
        'ngMessages',
        'ui.validate',
        'angular-loading-bar', // 加载loading
        'ngAnimate',
        'toastr'
    ]).run(initGdApp).config(function (cfpLoadingBarProvider, treeViewConfigProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        angular.extend(treeViewConfigProvider.options, {
            iconLeaf: 'fa fa-file',
            iconExpand: 'fa fa-minus',
            iconCollapse: 'fa fa-plus'
        });
    });


    // app List
    require('./app.router.js');
    require('./app.config.js');

    // common List
    require('./common/sidenav/sidenav.js');
    require('./common/sidenav/sidenav.service.js');
    require('./common/footer/footer.js');
    require('./common/kit/stringtonumber.js');


    // channel List
    require('./channel/channel.api.js');
    require('./channel/channel.constant.js');
    require('./channel/channel.service.js');

    require('./channel/list/list.controller.js');
    require('./channel/create/create.controller.js');
    require('./channel/edit/edit.controller.js');
    require('./channel/flow/flow.controller.js');
    require('./channel/winpop/winpop.controller.js');
    require('./channel/winpop/batchsetprice.controller.js');

    // Filters List

})(window, window.angular);

