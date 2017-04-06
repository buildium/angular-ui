#!/usr/bin/env node

var path = require('path');
var buildiumAngularDocs = require('@buildium/angular-docs');

buildiumAngularDocs({
    scripts: [
        '//ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js',
        'index.js'
    ],
    title: 'Buildium : Angular-UI',
    sourceFiles: [
        path.join(__dirname, '../src/**/*.js'),
        path.join(__dirname, '../index.js')
    ],
    destination: path.join(__dirname, '../docs')
});