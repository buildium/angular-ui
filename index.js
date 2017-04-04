'use strict';

let moduleName = 'buildium.angular-ui';

angular.module(moduleName, [
    require('./compile-dynamic-html'),
    require('./scroll-into-view'),
    require('./event'),
    require('./copy-to-clipboard'),
    require('./loading-src')
]);

module.exports = moduleName;
