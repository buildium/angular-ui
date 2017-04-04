'use strict';

let moduleName = 'buildium.angular-ui.compiletemplate';

angular.module(moduleName, [])
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