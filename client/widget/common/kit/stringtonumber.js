// jscs:disable JS003
/**
 * @file 指令
 * @author wufangjian
 */
/* eslint-disable max-params */
/* eslint-disable max-len */

(function (window, angular) {
    'use strict';

    angular.module('sspApp')
        .directive('stringToNumber', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function (value) {
                        return '' + value;
                    });
                    ngModel.$formatters.push(function (value) {
                        return parseFloat(value, 10);
                    });
                }
            };
        })

        // 测试
        .directive('hello', function () {
            return {
                restrict: 'AECM',
                replace: true,
                template: '<button style="background-color:{{color}}">click me</button>',
                scope: {
                    color: '='
                },
                link: function (scope, elements, attrs) {
                    elements.bind('click', function () {
                        scope.$apply(function () {
                            scope.color = 'pink';
                        });
                    });
                }
            }
        })

        .directive('levelOne', createDirective('levelOne'))
        .directive('levelTwo', createDirective('levelTwo'))
        .directive('levelThree', createDirective('levelThree'))

    /**
     <level-one>
     <level-two>
     <level-three>
     Hello
     </level-three>
     </level-two>
     </level-one>
     **/
    function createDirective(name) {
        return function () {
            return {
                restrict: 'E',
                replace: true,
                compile: function (tElem, tAttrs) {
                    console.log(name + ': compile');
                    return {
                        pre: function (scope, iElem, iAttrs) {
                            console.log(name + ': pre link');
                        },
                        post: function (scope, iElem, iAttrs) {
                            console.log(name + ': post link');
                        }
                    }
                }
            }
        }
    }
})(window, window.angular);