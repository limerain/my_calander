import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { CalendarUnit } from '@constant';
import { calendarStore, CalendarState } from '@store/global_store';

import YearContainer from './calendars/year_container';
import MonthContainer from './calendars/month_container';
import TimeTableContainer from './calendars/time_table/time_table_container';

const calendarContainers = new Map();
calendarContainers.set(CalendarUnit.YEARLY, <YearContainer />);
calendarContainers.set(CalendarUnit.MONTHLY, <MonthContainer />);
calendarContainers.set(CalendarUnit.DAILY, <TimeTableContainer />);

const CalendarContainer = (): ReactElement => {
  const [calendarState, setCalendarState] = useState<CalendarState>(calendarStore.initialState);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);

    return () => {
      calendarStoreSubs.unsubscribe();
    };
  }, []);

  return <div style={{ width: '55rem', height: '45rem' }}>{calendarContainers.get(calendarState.currentUnit)}</div>;
};

export default CalendarContainer;
