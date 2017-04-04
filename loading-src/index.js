'use strict';

/**
 * @ngdoc directive
 * @name buildium.manager-base.common.bdLoadingSrc
 *
 * @description
 * This directive will show a spinner and the message "Loading image" while an
 * image is being downloaded. This is also useful when we are dynamically
 * switching an images "src" attribute. If you use `<img ng-src="{{some_src}}" />`,
 * there is odd behavior when you switch the image source. Specifically, the
 * old image will display until the new one is loaded.
 *
 * @example
 *   <img title="Some Image" alt="Some Image" bd-loading-src="vm.image_src" />
 */
 
 let $ = require('jquery');
 
 let moduleName = 'buildium.angular-ui.loadingsrc';

 angular.module(moduleName, [])

.directive('bdLoadingSrc', function LoadingSrc() {
    let directive = {};

    directive.restrict = 'A';
    directive.transclude = 'element';

    directive.link = function link(scope, element, attrs, controller, transclude) {
        // Within the directive `element` refers to a comment in place of the transcluded directive.

        let previousImg,
            spinner = $('<div class="form-actions"><button disabled class="wait">Loading image...</button></div>');

        scope.$watch(attrs.bdLoadingSrc, function(newSrc) {
            if (!newSrc) {
                return;
            }

            if (previousImg) {
                previousImg.remove();
            }

            element.after(spinner);

            transclude(scope, function(img) {
                previousImg = img;

                img.attr('src', newSrc);
                img.on('load', function() {
                    scope.$apply(function() {
                        spinner.remove();
                        element.after(img);
                    });
                });
            });
        });
    };

    return directive;
});

module.exports = moduleName;
