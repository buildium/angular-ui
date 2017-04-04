'use strict';

let moduleName = 'buildium.angular-ui';

/**
 * @ndgoc module
 * @name angular-ui
 * @module angular-ui
 */
angular.module(moduleName, [
    require('./src/compile-dynamic-html')
]);

module.exports = moduleName;