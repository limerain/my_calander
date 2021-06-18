import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { Row } from 'antd';
import { calendarStore } from '@store/global_store';
import DayContainer from './day_container';

const WEEKDAY = 7;

const WeeklyContainer = (): ReactElement => {
  // const _days = [];

  // for (let i = 0; i < 7; i++) {
  //   const Day = moment(firstDayFormat).add('d', i);
  //   _days.push({
  //     yearMonthDayFormat: Day.format('YYYY-MM-DD'),
  //     getDay: Day.format('D'),
  //     isHolyDay: false,
  //   });
  // }
  const [calendarState, setCalendarState] = useState(calendarStore.initialState);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);

    return () => {
      calendarStoreSubs.unsubscribe();
    };
  }, []);

  const dayContainers: ReactElement[] = [];
  for (let i = 0; i < WEEKDAY; i++) {
    dayContainers.push(<DayContainer />);
  }

  return <Row>{dayContainers}</Row>;
};

export default WeeklyContainer;
