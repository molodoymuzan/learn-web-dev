export const MONTHS_NOMINATIVE = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
export const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
export const DAYS_OF_WEEK = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
export const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export function compareDates(d1, m1, y1, d2, m2, y2) {
  const date1 = new Date(y1, m1, d1);
  const date2 = new Date(y2, m2, d2);
  
  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
}

export function isDateSelectable(day, month, year, todayDate) {
  return compareDates(
    day, month, year,
    todayDate.getDate(), todayDate.getMonth(), todayDate.getFullYear()
  ) >= 0;
}

export function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay === -1) startDay = 6; 

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const grid = [];

  for (let i = startDay - 1; i >= 0; i--) {
    grid.push({ day: prevMonthDays - i, month: month - 1, year: year, isCurrentMonth: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    grid.push({ day: i, month: month, year: year, isCurrentMonth: true });
  }

  const remainder = 42 - grid.length;
  const extraDays = grid.length > 35 ? remainder : 35 - grid.length;
  
  for (let i = 1; i <= extraDays; i++) {
    grid.push({ day: i, month: month + 1, year: year, isCurrentMonth: false });
  }

  return grid;
}
