import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { CalendarMode } from '@constant';
import { calendarStore } from '@store/global_store';

import YearContainer from './calendars/year_container';
import TimeTableContainer from './calendars/time_table';

const calendarContainers = new Map();
calendarContainers.set(CalendarMode.Calendar, YearContainer);
calendarContainers.set(CalendarMode.TimeTable, TimeTableContainer);

const CalendarContainer = (): ReactElement => {
  const [calendarState, setCalendarState] = useState(calendarStore.initialState);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);

    return () => {
      calendarStoreSubs.unsubscribe();
    };
  }, []);

  return <>{calendarContainers.get(calendarState.currentMode)()}</>;
};

export default CalendarContainer;
