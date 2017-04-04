#!/usr/bin/env node

var path = require('path');
var docgen = require('dgeni-alive/src/docgen')();
var src = path.join(__dirname, '..');

var config = function(log) {
    log.level = 'info';
};

docgen.Package().config(config);

var sourceFiles = [
    path.join(src, 'compile-dynamic-html/*.js'),
    path.join(src, 'index.js')
];

var destination = path.join(src, 'docs');

docgen
    .src(sourceFiles)
    .dest(destination)
    .generate();