'use strict';

let $ = require('jquery');
let angular = require('angular');
require('angular-mocks');
require('./index.js');

/* global it, describe, beforeEach, spyOn, expect, inject, afterEach, angular, runs, waitsFor */
describe('Directive: bdLoadingSrc', () => {
    
    beforeEach(angular.mock.module('buildium.angular-ui.loadingsrc'));

    describe('bd-loading-src', () => {
        let elem, rootScope, compile, scope;

        let template = 
            `<div>
                <button class="next-image" ng-click="next()">Next Image</button>
                <img style="max-width: 500px;" bd-loading-src="images[index]">
            </div>`;
        
        beforeEach(inject(($rootScope, $compile) => {
            rootScope = $rootScope;
            scope = $rootScope.$new(true);
            compile = $compile;
            
            scope.images = [
                'http://lorempixel.com/1600/1200/city/1',
                'http://lorempixel.com/1600/1200/city/2',
                'http://lorempixel.com/1600/1200/city/3'
            ];
            
            scope.index = 0;
            
            scope.next = function next() {
                if (scope.index < scope.images.length - 1) {
                    scope.index++;
                } else {
                    scope.index = 0;
                }
            }
        }));

        it('should show "Loading image..." when waiting for image to load', () => {
            elem = angular.element(template);
            compile(elem)(scope);

            scope.$digest();
            
            expect($(elem).find('.wait').length).toEqual(1);
            
            $(elem).find('.next-image').click();

            expect($(elem).find('.wait').length).toEqual(1);
        });
        
        it('should remove message "Loading image..." when image has loaded', () => {
            elem = angular.element(template);
            compile(elem)(scope);

            scope.$digest();
            
            $(elem).find('img').load(() => {
                expect($(elem).find('.wait').length).toEqual(0);
            });
            
            $(elem).find('.next-image').click();
            
            $(elem).find('img').load(() => {
                expect($(elem).find('.wait').length).toEqual(0);
            });
        });
    });
});
