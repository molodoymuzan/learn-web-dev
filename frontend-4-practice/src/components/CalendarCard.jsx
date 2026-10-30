import { buildCalendarGrid, isDateSelectable, MONTHS_NOMINATIVE } from '../data/date';

export default function CalendarCard({ currentMonth, currentYear, selectedDay, today, onPrevMonth, onNextMonth, onDayClick }) {
  const grid = buildCalendarGrid(currentYear, currentMonth);

  return (
    <section className="card calendar-card">
      <div className="calendar-header">
        <span className="month-title">{MONTHS_NOMINATIVE[currentMonth]} {currentYear}</span>
        <div className="calendar-controls">
          <button type="button" className="btn-arrow btn-prev" onClick={onPrevMonth}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L1 5L5 9" stroke="#D59F50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button type="button" className="btn-arrow btn-next" onClick={onNextMonth}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="#D59F50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="calendar-weekdays">
        <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
      </div>

      <div className="calendar-days-grid">
        {grid.map((cell, index) => {
          const isSelectable = isDateSelectable(cell.day, cell.month, cell.year, today);
          const isSelected = selectedDay === cell.day && currentMonth === cell.month;
          
          let className = "day-cell ";
          if (!cell.isCurrentMonth || !isSelectable) {
            className += "past";
          } else {
            className += "active";
          }
          if (isSelected && cell.isCurrentMonth) {
            className += " selected";
          }

          const isDisabled = !cell.isCurrentMonth || !isSelectable;

          return (
            <button 
              key={index} 
              type="button" 
              className={className} 
              disabled={isDisabled}
              onClick={() => onDayClick(cell.day)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </section>
  );
}