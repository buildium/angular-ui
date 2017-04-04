'use strict';

/**
 * @ngdoc directive
 * @name angular-ui.bdEvent
 *
 * @description
 *
 * Attach callbacks to arbitray DOM events.
 *
 * @example
 * <div bd-event="{ scroll: onScroll }"></div>
 */

let moduleName = 'buildium.angular-ui.event';
let $ = require('jquery');

angular.module(moduleName, [])
.directive('bdEvent', function bdEvent() {
   let directive = {};

    directive.restrict = 'A';
    directive.link = function link(scope, element, attrs) {
        let eventObject = scope.$eval(attrs.bdEvent),
            $el = $(element);

        Object.keys(eventObject).forEach(function(key) {
            $el.on(key + '.bd-event', eventObject[key]);
        });

        // destory listeners when this directive is destroyed
        scope.$on('$destroy', function() {
            Object.keys(eventObject).forEach(function(key) {
                $el.off(key + '.bd-event');
            });
        });
    };

    return directive;
});

module.exports = moduleName;