import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { calendarStore, CalendarState } from '@store/global_store';
import DayofWeekPresenter from './calendar_header/day_of_week_presenter';
import WeeklyContainer from './weekly_container';

const WEEKINMONTH = 6;

const MonthlyCalendarContainer = (): ReactElement => {
  const [calendarState, setCalendarState] = useState<CalendarState>(calendarStore.initialState);
  const weekInMonthContainer: ReactElement[] = [];

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);

    return () => {
      calendarStoreSubs.unsubscribe();
    };
  }, []);

  if (!calendarState.currentDate) return <></>;

  const startofMonth = calendarState.currentDate.startOf('month');
  const startDayofMonth = startofMonth.get('d');
  const startDayofFirstWeek = startofMonth.clone().add(-startDayofMonth, 'd');

  for (let i = 0; i < WEEKINMONTH; i++) {
    const sundayofThisContainer = startDayofFirstWeek.clone().add(i * 7, 'd');
    weekInMonthContainer.push(
      <WeeklyContainer
        key={`my-month-calendar-${i}`}
        sundayofThisContainer={sundayofThisContainer}
        thisMonth={startofMonth.format('M')}
      />,
    );
  }

  return (
    <>
      <DayofWeekPresenter />
      {weekInMonthContainer}
    </>
  );
};

export default MonthlyCalendarContainer;
