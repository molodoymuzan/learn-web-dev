const MONTHS_NOMINATIVE = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const DAYS_OF_WEEK = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const today = new Date(2025, 5, 2);

const STATE = {
  currentMonth: today.getMonth(),
  currentYear: today.getFullYear(),
  selectedDay: today.getDate(),
  selectedTime: null
};

function compareDates(d1, m1, y1, d2, m2, y2) {
  const date1 = new Date(y1, m1, d1);
  const date2 = new Date(y2, m2, d2);
  
  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
}

function isDateSelectable(day, month, year, todayDate) {
  return compareDates(
    day, month, year,
    todayDate.getDate(), todayDate.getMonth(), todayDate.getFullYear()
  ) >= 0;
}

function buildCalendarGrid(year, month) {
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

function renderCalendar() {
  const gridContainer = document.getElementById('calendarGrid');
  const title = document.querySelector('.month-title');
  const grid = buildCalendarGrid(STATE.currentYear, STATE.currentMonth);
  
  const displayDate = new Date(STATE.currentYear, STATE.currentMonth, 1);
  title.textContent = `${MONTHS_NOMINATIVE[displayDate.getMonth()]} ${displayDate.getFullYear()}`;
  
  let html = "";

  grid.forEach(function(cell) {
    const isSelectable = isDateSelectable(cell.day, cell.month, cell.year, today);
    const isSelected = STATE.selectedDay === cell.day && STATE.currentMonth === cell.month;
    
    let className = "day-cell ";
    if (!cell.isCurrentMonth || !isSelectable) {
      className += "past";
    } else {
      className += "active";
    }

    if (isSelected && cell.isCurrentMonth) {
      className += " selected";
    }

    const disabledAttr = (!cell.isCurrentMonth || !isSelectable) ? "disabled" : "";

    html += `<button type="button" class="${className}" data-day="${cell.day}" ${disabledAttr}>${cell.day}</button>`;
  });

  gridContainer.innerHTML = html;

  const cells = gridContainer.querySelectorAll('.day-cell.active');
  cells.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      const clickedDay = parseInt(event.currentTarget.dataset.day);
      onDayClick(clickedDay);
    });
  });
}

function renderTimeSlots() {
  const timeContainer = document.getElementById('timeSlotsGrid');
  let html = "";

  TIMES.forEach(function(time, index) {
    const isSelected = STATE.selectedTime === time;
    
    const isBusy = (STATE.selectedDay + index) % 4 === 1;

    if (isBusy) {
      html += `
        <button type="button" class="time-slot busy" disabled>
          <span class="slot-time">${time}</span>
          <span class="slot-status">Занято</span>
        </button>
      `;
    } else {
      const className = isSelected ? "time-slot available selected" : "time-slot available";
      html += `
        <button type="button" class="${className}" data-time="${time}">
          <span class="slot-time">${time}</span>
        </button>
      `;
    }
  });

  timeContainer.innerHTML = html;

  const timeBtns = timeContainer.querySelectorAll('.time-slot.available');
  timeBtns.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      const clickedTime = event.currentTarget.dataset.time;
      onTimeSlotClick(clickedTime);
    });
  });
}

function updateBottomBar() {
  const infoDiv = document.getElementById('selectedInfo');
  
  if (STATE.selectedDay && STATE.selectedTime) {
    const dateObj = new Date(STATE.currentYear, STATE.currentMonth, STATE.selectedDay);
    const dayOfWeek = DAYS_OF_WEEK[dateObj.getDay()];
    const monthGenitive = MONTHS_GENITIVE[STATE.currentMonth];
    
    infoDiv.textContent = `${dayOfWeek}, ${STATE.selectedDay} ${monthGenitive} ${STATE.currentYear} • ${STATE.selectedTime}`;
  } else {
    infoDiv.textContent = 'Выберите время';
  }
}

function onDayClick(day) {
  STATE.selectedDay = day;
  STATE.selectedTime = null;
  
  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
}

function onTimeSlotClick(time) {
  STATE.selectedTime = time;
  
  renderTimeSlots();
  updateBottomBar();
}

function setupMonthNavigation() {
  const prevBtn = document.querySelector('.btn-prev');
  const nextBtn = document.querySelector('.btn-next');

  prevBtn.addEventListener('click', function() {
    STATE.currentMonth--;
    if (STATE.currentMonth < 0) {
      STATE.currentMonth = 11;
      STATE.currentYear--;
    }
    STATE.selectedDay = null;
    STATE.selectedTime = null;
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
  });

  nextBtn.addEventListener('click', function() {
    STATE.currentMonth++;
    if (STATE.currentMonth > 11) {
      STATE.currentMonth = 0;
      STATE.currentYear++;
    }
    STATE.selectedDay = null;
    STATE.selectedTime = null;
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
  });
}

function init() {
  setupMonthNavigation();
  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
}

document.addEventListener('DOMContentLoaded', init);
