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
 * @restrict A
 * @description
 *     Replaces the contents of the element with the result of compiling the html string.
 *     Updates on changes to any contained scope variables
 * @example
 *     ```html
 *     <div bd-compile-dynamic-html="'<h1>{{title}}</h1>'"></div>
 *     ```
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