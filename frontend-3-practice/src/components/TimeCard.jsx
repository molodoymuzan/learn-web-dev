export default function TimeCard({ selectedDay, selectedTime, slots, onTimeClick }) {
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
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time;

          if (!slot.available) {
            return (
              <button key={slot.time} type="button" className="time-slot busy" disabled>
                <span className="slot-time">{slot.time}</span>
                <span className="slot-status">Занято</span>
              </button>
            );
          }

          return (
            <button 
              key={slot.time} 
              type="button" 
              className={`time-slot available ${isSelected ? "selected" : ""}`}
              onClick={() => onTimeClick(slot.time)}
            >
              <span className="slot-time">{slot.time}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
