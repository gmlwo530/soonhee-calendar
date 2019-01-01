"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
global.soonHeeCalendar = new Object();

global.soonHeeCalendar.formContainer = undefined;

global.soonHeeCalendar.dayTextObject = {};

global.soonHeeCalendar.textSelectedDay = undefined;

global.soonHeeCalendar.selectedDays = [];

global.soonHeeCalendar.daysInRange = [];

global.soonHeeCalendar.startEndDateArr = [{ "startDate": undefined, "endDate": undefined }];

var initializeGlobal = exports.initializeGlobal = function initializeGlobal() {
  global.soonHeeCalendar.formContainer = undefined;

  global.soonHeeCalendar.dayTextObject = {};

  global.soonHeeCalendar.textSelectedDay = undefined;

  global.soonHeeCalendar.selectedDays = [];

  global.soonHeeCalendar.daysInRange = [];

  global.soonHeeCalendar.startEndDateArr = [{ "startDate": undefined, "endDate": undefined }];
};

var soonHeeCalendar = exports.soonHeeCalendar = global.soonHeeCalendar;