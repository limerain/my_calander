import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { calendarStore } from '@store/global_store';
import CalendarVM from '@vm/calendar_vm';

const CurrentDateContainer = (): ReactElement => {
  const [calendarState, setCalendarState] = useState(calendarStore.initialState);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);
    if (!calendarState.currentDate) CalendarVM.initDate();

    return () => {
      calendarStoreSubs.unsubscribe();
    };
  }, []);

  return <>{calendarState.currentDate?.format('YYYY년 MM월')}</>;
};

export default CurrentDateContainer;
