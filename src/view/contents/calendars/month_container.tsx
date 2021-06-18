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
    const clearFunction = () => {
      calendarStoreSubs.unsubscribe();
    };

    if (!calendarState.currentDate) return clearFunction;

    const startofMonth = calendarState.currentDate?.startOf('month');
    const startDayofMonth = startofMonth?.get('d');
    const startDayofWeek = startofMonth?.clone().add('d', -startDayofMonth!);
    console.log('startofMonth: ', startofMonth);
    // console.log(moment().calendar(startofMonth));

    return clearFunction;
  }, [calendarState.currentDate]);
  for (let i = 0; i < WEEKINMONTH; i++) {
    weekInMonthContainer.push(<WeeklyContainer />);
  }

  return (
    <>
      <DayofWeekPresenter />
      {weekInMonthContainer}
    </>
  );
};

export default MonthlyCalendarContainer;
