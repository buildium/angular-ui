#!/usr/bin/env node

var path = require('path');
var docgen = require('dgeni-alive/src/docgen')();

var config = function(log) {
    log.level = 'info';
};

docgen.Package().config(config);

var sourceFiles = [
    path.join(__dirname, '../index.js'),
    path.join(__dirname, '../src/**/*.js')
];

var destination = path.join(__dirname, '../docs');

docgen
    .src(sourceFiles)
    .dest(destination)
    .generate();