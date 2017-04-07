/* global angular */

const $ = require('jquery');

const moduleName = 'buildium.angular-ui.event';

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
.directive('bdEvent', () => {
    const directive = {};

    directive.restrict = 'A';
    directive.link = function link(scope, element, attrs) {
        const eventObject = scope.$eval(attrs.bdEvent);
        const $el = $(element);

        Object.keys(eventObject).forEach((key) => {
            $el.on(`${key}.bd-event`, eventObject[key]);
        });

        // destory listeners when this directive is destroyed
        scope.$on('$destroy', () => {
            Object.keys(eventObject).forEach((key) => {
                $el.off(`${key}.bd-event`);
            });
        });
    };

    return directive;
});

module.exports = moduleName;
