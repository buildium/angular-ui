(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

let moduleName = 'buildium.angular-ui';

/**
 * @ndgoc module
 * @name angular-ui
 * @module angular-ui
 */
angular.module(moduleName, [
    require('./src/compile-dynamic-html')
]);

module.exports = moduleName;
},{"./src/compile-dynamic-html":2}],2:[function(require,module,exports){
let moduleName = 'buildium.angular-ui.compiledynamichtml';

/**
 * @ngdoc module
 * @name compile-dynamic-html
 * @module compile-dynamic-html
 */
angular.module(moduleName, [])

/**
 * @ngdoc directive
 * @name bdCompileDynamicHtml
 * @module  compile-dynamic-html
 *
 * @restrict A
 *
 * @description
 * Replaces the contents of the element with the result of compiling the html string.
 * Updates on changes to any contained scope variables.
 *
 * @param {string} bdCompileDynamicHtml AngularJS expression evaluating to the html
 *                                      that should be rendered in this container.
 *
 * @example
    <example module="compileDynamicHtmlExample" name="bd-compile-dynamic-html">
        <file name="index.html">
            <div ng-controller="ExampleController">
                <label>Title
                    <input type="text" ng-model="title" />
                </label>
                <label>Dynamic Template
                    <textarea ng-model="dynamicHtml" style="display: block"></textarea>
                </label>
                <h2>Result</h2>
                <div bd-compile-dynamic-html="dynamicHtml"></div>
            </div>
        </file>
        <file name="script.js">
            angular.module('compileDynamicHtmlExample', [])
                .controller('ExampleController', ['$scope', function($scope) {
                    $scope.title = 'Hello world';
                    $scope.dynamicHtml = '<b>{{title}}</b>'
                }]);
        </file>
    </example>
 *
 */
.directive('bdCompileDynamicHtml', function CompileDynamicHtml() {
    let directive = {};

    directive.restrict = 'A';
    directive.replace = true;

    directive.link = function link(scope, ele, attrs) {
        scope.$watch(attrs.bdCompileDynamicHtml, function(html) {
            ele.html(html);
            $compile(ele.contents())(scope);
        });
    };

    return directive;
});

module.exports = moduleName;
},{}]},{},[1]);
