'use strict';

let $ = require('jquery');

/**
 * @ngdoc directive
 * @name buildium.common.bdScrollIntoView
 *
 * @restrict 'A'
 *
 * @description
 *
 * If this directive's property evalutes to true, the element will be scrolled into view.
 *
 * The speed can be set with the attribute `bd-scroll-into-view-speed`
 *
 * @depends buildium.common.services.page
 *
 * <!-- example #1 -->
 *    <input bd-scroll-into-view="true" />
 * <!-- /example -->
 *
 * <!-- example #2: a very sloooow scroll -->
 *    <input bd-scroll-into-view="vm.someVariable" bd-scroll-into-view-speed="1500" />
 * <!-- /example -->
 */

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

angular.module(moduleName, [])
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
