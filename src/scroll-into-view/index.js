'use strict';

let $ = require('jquery');



function scrollToElement(element, fn, duration) {
    let target = element.length ? element : $(element);
    let callback = (fn && typeof fn === 'function') ? fn : function emptyFn() {};
    let speed = duration || 750;

    if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top
        }, speed)
            .promise()
            .then(callback);
    }
};

let moduleName = 'buildium.angular-ui.scrollintoview';

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
    var directive = {};

    directive.restrict = 'A';

    directive.link = function bdScrollIntoViewLink(scope, element, attrs) {
        var speed = scope.$eval(attrs.bdScrollIntoViewSpeed);

        scope.$watch(attrs.bdScrollIntoView, function(newValue) {
            if (newValue) {
                $timeout(scrollToElement.bind(null, element, null, speed));
            }
        });
    };

    return directive;
}]);

module.exports = moduleName;
