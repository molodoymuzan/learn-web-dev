import { DAYS_OF_WEEK, MONTHS_GENITIVE } from '../data/date';

export default function ActionsRow({ currentMonth, currentYear, selectedDay, selectedTime, onContinue }) {
  const isComplete = selectedDay && selectedTime;
  
  let infoText = 'Выберите время';
  if (isComplete) {
    const dateObj = new Date(currentYear, currentMonth, selectedDay);
    const dayOfWeek = DAYS_OF_WEEK[dateObj.getDay()];
    const monthGenitive = MONTHS_GENITIVE[currentMonth];
    infoText = `${dayOfWeek}, ${selectedDay} ${monthGenitive} ${currentYear} • ${selectedTime}`;
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