/* global angular */

const $ = require('jquery');


function scrollToElement(element, fn, duration) {
    const target = element.length ? element : $(element);
    const callback = (fn && typeof fn === 'function') ? fn : function emptyFn() {};
    const speed = duration || 750;

    if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top
        }, speed)
            .promise()
            .then(callback);
    }
}

const moduleName = 'buildium.angular-ui.scrollintoview';

/**
 * @ngdoc module
 * @name scroll-into-view
 * @module scroll-into-view
 */
angular.module(moduleName, [])

/**
 * @ngdoc directive
 * @name bdScrollIntoView
 * @module scroll-into-view
 *
 * @restrict A
 *
 * @description
 *
 * If this directive's property evalutes to true, the element will be scrolled into view.
 *
 * @param {Boolean} bdScrollIntoView Whether this directive should be active on the element
 * @param {Number} bdScrollIntoViewSpeed How fast the content is scrolled
 *
 * @example
 * ```html
 * <input bd-scroll-into-view="true" />
 * ```
 *
 * @example
 * ```html
 * <input bd-scroll-into-view="vm.someVariable" bd-scroll-into-view-speed="1500" />
 * ```
 */
.directive('bdScrollIntoView', ['$timeout', function bdScrollIntoView($timeout) {
    const directive = {};

    directive.restrict = 'A';

    directive.link = function bdScrollIntoViewLink(scope, element, attrs) {
        const speed = scope.$eval(attrs.bdScrollIntoViewSpeed);

        scope.$watch(attrs.bdScrollIntoView, (newValue) => {
            if (newValue) {
                $timeout(scrollToElement.bind(null, element, null, speed));
            }
        });
    };

    return directive;
}]);

module.exports = moduleName;
