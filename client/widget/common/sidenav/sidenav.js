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
        .directive('subNav', function () {
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
                        angular.forEach($scope.sideNavConfig, function (item, index) {
                            parKey !== index ? (item.selected = false) : (item.selected = true);
                        });
                    };

                    $scope.subNav = function (parKey, subKey) {
                        angular.forEach($scope.sideNavConfig, function (item, parIndex) {
                            angular.forEach(item.subNav, function(obj, subIndex){
                                subKey !== subIndex ? (obj.selected = false) : (obj.selected = true);
                            });
                        });
                    }
                }
            };
        });
})(window, window.angular);
