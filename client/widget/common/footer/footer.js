/**
 * @file ssp App Footer
 * @author wufangjian
 */
(function(window, angular) {
    'use strict';

    angular.module('sspApp')
        .directive('appFooter', function() {
            return {
                restrict: 'EA',
                scope: {
                    name: '='
                },
                templateUrl: __uri('./footer.html'),
                link: function($scope, $element, $attrs) {
                    $scope.timer = new Date().getFullYear();
                }
            }
        });

})(window, window.angular);