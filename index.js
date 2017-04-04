'use strict';

let moduleName = 'buildium.angular-ui';

angular.module(moduleName, [
    require('./compile-dynamic-html')
    require('./loading-src')
]);

module.exports = moduleName;
