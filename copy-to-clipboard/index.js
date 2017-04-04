'use strict';

let uniqueId = require('lodash.uniqueid');
let component = {};

component.restrict = 'E';
component.template = '<a class="{{:: vm.buttonClasses}}" ng-click="vm.copyTextToClipboard()">{{:: vm.buttonLabel}}</a>' +
    '<div id="{{:: vm.clipBoardTextId}}" class="copy-to-clipboard-text">{{:: vm.copyText}}</div>';
component.controllerAs = 'vm';
component.bindToController = true;
component.bindings = {
    copyText: '<',
    buttonLabel: '@',
    buttonClasses: '@?'
};

//@ngInject
component.controller = function BdCopyToClipboard($log) {
    let vm = this;

    function clearSelection() {
        let selection = window.getSelection ? window.getSelection() : document.selection;
        if (selection) {
            if (selection.removeAllRanges && typeof selection.removeAllRanges === 'function') {
                selection.removeAllRanges();
            } else if (selection.empty && typeof selection.empty === 'function') {
                selection.empty();
            }
        }
    }

    function selectText(containerid) {
        let range;
        clearSelection();
        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
        }
    }

    vm.$onInit = function onInit() {
        vm.clipBoardTextId = uniqueId('clipboard-text-');
    };

    vm.copyTextToClipboard = function copyTextToClipboard() {
        let wasCopySuccessful;
        selectText(vm.clipBoardTextId);
        try {
            wasCopySuccessful = document.execCommand('copy');
            if (wasCopySuccessful) {
                $log.info('Copied to clipboard');
            } else {
                $log.error('Oops, this is not supported in your browser');
            }
        } catch (err) {
            $log.error('Oops, this is not supported in your browser');
        }
        clearSelection();
    };
};

let moduleName = 'buildium.angular-ui.copytoclipboard';

angular.module(moduleName, [])
.component('bdCopyToClipboard', component)

module.exports = moduleName;
