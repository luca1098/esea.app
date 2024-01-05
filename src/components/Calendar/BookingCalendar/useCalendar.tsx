import { month, weekDays } from '@/core/utils/calendar';
import { unionBy } from 'lodash';
import { useState } from 'react';

const useCalendar = () => {
  const date = new Date();

  const [currentDay, setCurrentDay] = useState<number>(date.getDate());
  const [currentMont, setCurrentMont] = useState<number>(date.getMonth());
  const [currentYear, setCurrentYeas] = useState<number>(date.getFullYear());

  const currentMontLabel = month[currentMont];
  const daysOfCurrentMonth = getDaysInMonth(currentMont, currentYear);

  const onPrev = () => {
    const newDate = new Date(currentYear, currentMont, currentDay);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDay(newDate.getDate());
    setCurrentMont(newDate.getMonth());
    setCurrentYeas(newDate.getFullYear());
  };
  const onNext = () => {
    const newDate = new Date(currentYear, currentMont, currentDay);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDay(newDate.getDate());
    setCurrentMont(newDate.getMonth());
    setCurrentYeas(newDate.getFullYear());
  };

  function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, currentMont);
    const days = [];

    while (date.getMonth() === month) {
      const day = {
        numbDay: new Date(date).getDate(),
        weekDayIndex: new Date(date).getDay(),
        monthIndex: new Date(date).getMonth(),
      };
      days.push(day);
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  const getDaysInWeek = (day: number, month: number, year: number) => {
    const currDate = new Date(year, month, day);
    const prevDates = getPrevToMonday(currDate);
    const nextDates = getNextToSunday(currDate);
    const days = unionBy(prevDates, nextDates, 'numbDay').sort(
      (a, b) => a.weekDayIndex - b.weekDayIndex,
    );
    return days;
  };

  const getPrevToMonday = (date: Date) => {
    const days = [];
    const currDate = new Date(date.getTime());
    const dayIndex = currDate.getDay();
    for (let i = dayIndex; i >= 0; i--) {
      const day = {
        numbDay: new Date(currDate).getDate(),
        weekDayIndex: new Date(currDate).getDay(),
        monthIndex: new Date(currDate).getMonth(),
      };
      days.push(day);
      currDate.setDate(currDate.getDate() - 1);
    }
    return days;
  };
  const getNextToSunday = (date: Date) => {
    const days = [];
    const currDate = new Date(date.getTime());
    const dayIndex = currDate.getDay();
    for (let i = dayIndex; i <= 6; i++) {
      const day = {
        numbDay: new Date(currDate).getDate(),
        weekDayIndex: new Date(currDate).getDay(),
        monthIndex: new Date(currDate).getMonth(),
      };
      days.push(day);
      currDate.setDate(currDate.getDate() + 1);
    }
    return days;
  };

  const daysInWeek = getDaysInWeek(currentDay, currentMont, currentYear);
  return {
    currentMontLabel,
    currentMont,
    currentYear,
    daysOfCurrentMonth,
    weekDays,
    daysInWeek,
    onPrev,
    onNext,
  };
};

export default useCalendar;
