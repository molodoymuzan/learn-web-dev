import { useState, useEffect } from "react";
import Header from "./components/Header";
import StepsBar from "./components/StepsBar";
import CalendarCard from "./components/CalendarCard";
import TimeCard from "./components/TimeCard";
import ActionsRow from "./components/ActionsRow";
import Footer from "./components/Footer";
import SuccessModal from "./components/SuccessModal";
import { fetchToday, fetchSlots } from "./api";

export default function App() {
  const [today, setToday] = useState(null);
  const [loadingToday, setLoadingToday] = useState(true);
  const [errorToday, setErrorToday] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorSlots, setErrorSlots] = useState(null);

  useEffect(() => {
    async function loadToday() {
      try {
        setLoadingToday(true);
        setErrorToday(null);
        const data = await fetchToday();
        setToday(new Date(data.year, data.month, data.day));
        setCurrentMonth(data.month);
        setCurrentYear(data.year);
        setSelectedDay(data.day);
      } catch (err) {
        setErrorToday(err.message);
      } finally {
        setLoadingToday(false);
      }
    }
    loadToday();
  }, []);

  useEffect(() => {
    if (selectedDay === null || currentMonth === null || currentYear === null) return;
    
    let isRelevant = true;

    async function loadSlots() {
      try {
        setLoadingSlots(true);
        setErrorSlots(null);
        const response = await fetchSlots(selectedDay, currentMonth, currentYear);
        
        if (
          isRelevant && 
          response.date.day === selectedDay && 
          response.date.month === currentMonth && 
          response.date.year === currentYear
        ) {
          setSlots(response.slots);
        }
      } catch (err) {
        if (isRelevant) setErrorSlots(err.message);
      } finally {
        if (isRelevant) setLoadingSlots(false);
      }
    }

    loadSlots();

    return () => {
      isRelevant = false;
    };
  }, [selectedDay, currentMonth, currentYear]);

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

        {loadingToday ? (
          <div className="empty-time-message" style={{ textAlign: 'center', padding: '40px' }}>
            Загрузка календаря...
          </div>
        ) : errorToday ? (
          <div className="empty-time-message" style={{ textAlign: 'center', padding: '40px', color: '#b14141' }}>
            Ошибка: {errorToday}
          </div>
        ) : (
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
              slots={slots}
              loading={loadingSlots}
              error={errorSlots}
            />
          </div>
        )}

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
