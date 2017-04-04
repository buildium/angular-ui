'use strict';

let moduleName = 'buildium.angular-ui';

angular.module(moduleName, [
    require('./compile-dynamic-html'),
    require('./copy-to-clipboard')
]);

module.exports = moduleName;