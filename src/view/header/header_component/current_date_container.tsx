import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { calendarStore, CalendarState } from '@store/global_store';
import CalendarVM from '@vm/calendar_vm';
import { CalendarUnit } from '@constant';

const CurrentDateContainer = (): ReactElement => {
  const [calendarState, setCalendarState] = useState<CalendarState>(calendarStore.initialState);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);
    if (!calendarState.currentDate) CalendarVM.initDate();

    return () => {
      calendarStoreSubs.unsubscribe();
    };
  }, []);
  if (!calendarState.currentDate) return <></>;
  const format = calendarState.currentUnit === CalendarUnit.DAILY ? 'YYYY년 MM월 DD일' : 'YYYY년 MM월';

  return <>{calendarState.currentDate.format(format)}</>;
};

export default CurrentDateContainer;
