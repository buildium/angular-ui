(function(angular) {
  'use strict';
'use strict';

let moduleName = 'buildium.angular-ui';

/**
 * @ndgoc module
 * @name angular-ui
 * @module angular-ui
 */
angular.module(moduleName, [
    require('./compile-dynamic-html'),
    require('./scroll-into-view'),
    require('./event'),
    require('./copy-to-clipboard'),
    require('./loading-src'),
    require('./compile-template')
]);

module.exports = moduleName;

})(window.angular);