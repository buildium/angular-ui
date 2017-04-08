const angular = require('angular');
require('angular-mocks');
const moduleName = require('./index');

describe('compile-dynamic-html', () => {
    let scope, compile, element;

    beforeEach(angular.mock.module(moduleName));

    beforeEach(angular.mock.inject(($rootScope, $compile) => {
        scope = $rootScope.$new();
        compile = () => {
            element = angular.element('<div bd-compile-dynamic-html="html" />');
            $compile(element)(scope);
            scope.$digest();
        };
    }));

    it('should add the string as html to the element', () => {
        scope.html = '<strong>be strong</strong>';
        compile();
        expect(element.find('strong').length).toBe(1);
        expect(element.find('strong').text()).toEqual('be strong');
    });

    it('should compile interpolated values', () => {
        scope.message = 'be strong';
        scope.html = '<strong>{{message}}</strong>';
        compile();
        expect(element.find('strong').text()).toEqual('be strong');
    });

    it('should update on change to interpolated values', () => {
        scope.message = 'be strong';
        scope.html = '<strong>{{message}}</strong>';
        compile();
        scope.message = 'be bold';
        scope.$digest();
        expect(element.find('strong').text()).toEqual('be bold');
    });

    it('should update on change to the html string', () => {
        scope.message = 'be strong';
        scope.html = '<strong>{{message}}</strong>';
        compile();
        scope.html = '<h1>{{message}}</h1>';
        scope.$digest();
        expect(element.find('strong').length).toBe(0);
        expect(element.find('h1').length).toBe(1);
        expect(element.find('h1').text()).toEqual('be strong');
    });
});
