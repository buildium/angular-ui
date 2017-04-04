'use strict';



let moduleName = 'buildium.angular-ui.event';
let $ = require('jquery');

/**
 * @ngdoc module
 * @name event
 * @module event
 */
angular.module(moduleName, [])

/**
 * @ngdoc directive
 * @name bdEvent
 * @module event
 *
 * @description
 *
 * Attach callbacks to arbitray DOM events.
 *
 * @param {object} bdEvent A map of event names to functions on the scope to execute
 *                         when that event is fired
 *
 * @example
 * ```html
 * <div bd-event="{ scroll: onScroll }"></div>
 * ```
 */
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