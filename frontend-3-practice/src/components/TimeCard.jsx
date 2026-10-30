import { TIMES } from '../data/date';

export default function TimeCard({ selectedDay, selectedTime, onTimeClick }) {
  if (selectedDay === null) {
    return (
      <section className="card time-card">
        <h2 className="card-title">Доступное время</h2>
        <div className="empty-time-message">Сначала выберите дату в календаре</div>
        <div className="time-slots-grid d-none"></div>
      </section>
    );
  }

  return (
    <section className="card time-card">
      <h2 className="card-title">Доступное время</h2>
      <div className="time-slots-grid">
        {TIMES.map((time, index) => {
          const isSelected = selectedTime === time;
          const isBusy = (selectedDay + index) % 4 === 1;

          if (isBusy) {
            return (
              <button key={time} type="button" className="time-slot busy" disabled>
                <span className="slot-time">{time}</span>
                <span className="slot-status">Занято</span>
              </button>
            );
          }

          return (
            <button 
              key={time} 
              type="button" 
              className={`time-slot available ${isSelected ? "selected" : ""}`}
              onClick={() => onTimeClick(time)}
            >
              <span className="slot-time">{time}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
