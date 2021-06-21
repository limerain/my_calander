import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { Row, Col } from 'antd';
import { nanoid } from 'nanoid';
import { calendarStore, CalendarState } from '@store/global_store';

import TimeHeaderPresenter from './time_header_presenter';
import ScheduleContainer from './schedule_component/schedule_container';

const timeTable = [
  '12:00 AM',
  '1:00 AM',
  '2:00 AM',
  '3:00 AM',
  '4:00 AM',
  '5:00 AM',
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM',
];

const TimeTableContainer = (): ReactElement => {
  const [calendarState, setCalendarState] = useState<CalendarState>(calendarStore.initialState);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);

    return () => {
      calendarStoreSubs.unsubscribe();
    };
  }, []);
  if (!calendarState.currentDate) return <></>;
  const today = calendarState.currentDate.clone().startOf('d');

  return (
    <Row>
      <Col style={{ width: '9rem' }}>
        {timeTable.map(function mappingTimeTable(v: string) {
          return <TimeHeaderPresenter key={nanoid()} time={v} />;
        })}
      </Col>
      <Col style={{ width: '80%' }}>
        {timeTable.map(function fillTimeTable(_: string, k: number) {
          return <ScheduleContainer key={nanoid()} presentTime={today.clone().add(k, 'h')} />;
        })}
      </Col>
    </Row>
  );
};

export default TimeTableContainer;
