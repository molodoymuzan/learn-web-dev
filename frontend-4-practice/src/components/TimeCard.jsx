export default function TimeCard({ selectedDay, selectedTime, onTimeClick, slots, loading, error }) {
  if (selectedDay === null) {
    return (
      <section className="card time-card">
        <h2 className="card-title">Доступное время</h2>
        <div className="empty-time-message">Сначала выберите дату в календаре</div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="card time-card">
        <h2 className="card-title">Доступное время</h2>
        <div className="empty-time-message">Загрузка слотов...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card time-card">
        <h2 className="card-title">Доступное время</h2>
        <div className="empty-time-message" style={{ color: '#b14141' }}>Ошибка: {error}</div>
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