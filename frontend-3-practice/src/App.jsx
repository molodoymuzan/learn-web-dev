import { useState } from "react";
import Header from "./components/Header";
import StepsBar from "./components/StepsBar";
import CalendarCard from "./components/CalendarCard";
import TimeCard from "./components/TimeCard";
import ActionsRow from "./components/ActionsRow";
import Footer from "./components/Footer";
import SuccessModal from "./components/SuccessModal";

const today = new Date();
today.setHours(0, 0, 0, 0);

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const handleContinue = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  return (
    <div className="page">
      <Header />
      <StepsBar />

      <main className="booking-layout">
        <h1 className="page-title">Выберите доступное время</h1>

        <div className="booking-cards">
          <CalendarCard
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedDay={selectedDay}
            today={today}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onDayClick={handleDayClick}
          />
          <TimeCard
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            onTimeClick={handleTimeClick}
          />
        </div>

        <ActionsRow
          currentMonth={currentMonth}
          currentYear={currentYear}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          onContinue={handleContinue}
        />
      </main>

      <Footer />

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
