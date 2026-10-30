export default function StepsBar() {
  return (
    <section className="steps-bar">
      <div className="steps-container">
        <div className="step completed">
          <span className="step-num">1</span>
          <span className="step-name">Мастер</span>
          <span className="step-line"></span>
        </div>
        <div className="step completed">
          <span className="step-num">2</span>
          <span className="step-name">Услуги</span>
          <span className="step-line"></span>
        </div>
        <div className="step active">
          <span className="step-num">3</span>
          <span className="step-name">Время</span>
          <span className="step-line"></span>
        </div>
        <div className="step disabled">
          <span className="step-num">4</span>
          <span className="step-name">Контакты</span>
          <span className="step-line"></span>
        </div>
        <div className="step disabled">
          <span className="step-num">5</span>
          <span className="step-name">Подтверждение</span>
          <span className="step-line"></span>
        </div>
      </div>
    </section>
  );
}
