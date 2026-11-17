import { DAYS_OF_WEEK, MONTHS_GENITIVE } from '../data/date';

export default function ActionsRow({ currentMonth, currentYear, selectedDay, selectedTime, onContinue }) {
  const isComplete = selectedDay !== null && selectedTime !== null;
  
  let infoText = 'Выберите дату и время';

  if (selectedDay !== null && currentMonth !== null && currentYear !== null) {
    const dateObj = new Date(currentYear, currentMonth, selectedDay);
    const dayOfWeek = DAYS_OF_WEEK[dateObj.getDay()];
    const monthGenitive = MONTHS_GENITIVE[currentMonth];
    
    const dateStr = `${dayOfWeek}, ${selectedDay} ${monthGenitive} ${currentYear}`;
    
    if (selectedTime !== null) {
      infoText = `${dateStr} • ${selectedTime}`;
    } else {
      infoText = `${dateStr} • Время не выбрано`;
    }
  }

  return (
    <div className="actions-row">
      <div className="selected-info">{infoText}</div>
      <button type="button" className="btn btn-secondary">Назад</button>
      <button 
        type="button" 
        className="btn btn-primary" 
        disabled={!isComplete}
        style={{
          opacity: isComplete ? '1' : '0.5',
          cursor: isComplete ? 'pointer' : 'not-allowed'
        }}
        onClick={onContinue}
      >
        Продолжить
      </button>
    </div>
  );
}