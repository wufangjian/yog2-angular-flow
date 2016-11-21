/**
 * @author wufangjian
 */
(function (window, angular) {
    'use strict';

    angular.module('sspApp')
        .directive('parNav', function () {
            return {
                restrict: 'ECMA',
                link: function (scope, element) {
                    scope.$watch('item.selected', function () {
                        if (element.hasClass('active') && scope.item.selected === false) {
                            element.removeClass('active');
                        }
                    });
                }
            }
        })
        .directive('sideNav', function(sideNavConfig){
            return {
                restrict: 'EA',
                templateUrl: __uri('./sidenav.html'),
                link: function($scope, $element, $attrs){
                    $scope.sideNavConfig = sideNavConfig;
                    $scope.parNav = function (parKey) {
                        angular.forEach($scope.sideNavConfig, function (item, key) {
                            if (parKey !== key) {
                                item.selected = false;
                            }
                            else {
                                item.selected = true;
                            }
                        });
                    };
                }
            };
        });
})(window, window.angular);
