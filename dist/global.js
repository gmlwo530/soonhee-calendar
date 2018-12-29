"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
global.formContainer = undefined;

global.dayTextObject = {};

global.textSelectedDay = undefined;

global.selectedDays = [];

global.daysInRange = [];

global.startEndDateArr = [{ "startDate": undefined, "endDate": undefined }];

var initializeGlobal = exports.initializeGlobal = function initializeGlobal() {
  global.formContainer = undefined;

  global.dayTextObject = {};

  global.textSelectedDay = undefined;

  global.selectedDays = [];

  global.daysInRange = [];

  global.startEndDateArr = [{ "startDate": undefined, "endDate": undefined }];
};