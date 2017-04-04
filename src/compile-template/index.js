'use strict';

/**
 * @ngdoc module
 * @name compile-template
 * @module compile-template
 */
let moduleName = 'buildium.angular-ui.compiletemplate';

angular.module(moduleName, [])
/**
 * @ngdoc directive
 * @name bdCompileTemplate
 * @module  compile-template
 *
 * @restrict A
 *
 * @description
 * Compiles the HTML that is bound using ng-bing-html.
 *
 *
 * @example
     <example module="compileTemplateExample" name="bd-compile-template">
         <file name="index.html">
            <div ng-controller="ExampleController">
                <label>Title
                    <input type="text" ng-model="title" />
                </label>
                <label>Compile Template
                 <textarea ng-model="dynamicHtml" style="display: block"></textarea>
                </label>
                <h2>Result</h2>
                <div ng-bind-html="dynamicHtml" bd-compile-template></div>
            </div>
         </file>
         <file name="script.js">
            angular.module('compileTemplateExample', [])
            .controller('ExampleController', ['$scope', function($scope) {
                            $scope.title = 'Hello world';
                            $scope.dynamicHtml = '<b>{{title}}</b>'
                        }]);
         </file>
     </example>
 *
 */
.directive('bdCompileTemplate', ['$compile', '$parse', function BdCompileTemplate($compile, $parse) {
    let directive = {};

    directive.restrict = 'A';
    directive.link = function link(scope, element, attr) {
        let parsed = $parse(attr.ngBindHtml);
        function getStringValue() {
            return (parsed(scope) || '').toString();
        }

        //Recompile if the template changes
        scope.$watch(getStringValue, function stringValueChanged() {
            $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
        });
    };

    return directive;
}]);

module.exports = moduleName;