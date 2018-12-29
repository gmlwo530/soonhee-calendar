global.soonHeeCalendar = new Object();

global.soonHeeCalendar.formContainer = undefined;

global.soonHeeCalendar.dayTextObject = {};

global.soonHeeCalendar.textSelectedDay = undefined;

global.soonHeeCalendar.selectedDays = [];

global.soonHeeCalendar.daysInRange = [];

global.soonHeeCalendar.startEndDateArr = [{"startDate":undefined, "endDate":undefined}];

export const initializeGlobal = () => {
  global.soonHeeCalendar.formContainer = undefined;

  global.soonHeeCalendar.dayTextObject = {};

  global.soonHeeCalendar.textSelectedDay = undefined;

  global.soonHeeCalendar.selectedDays = [];

  global.soonHeeCalendar.daysInRange = [];

  global.soonHeeCalendar.startEndDateArr = [{"startDate":undefined, "endDate":undefined}];
}


export const soonHeeCalendar = global.soonHeeCalendar;
