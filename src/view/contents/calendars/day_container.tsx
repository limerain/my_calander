import React, { ReactElement, useRef, useLayoutEffect, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { fromEvent, Observable } from 'rxjs';
import { Moment } from 'moment';
import { SCHEDULE_MAP_KEY_FORMAT } from '@constant';
import CalendarVM from '@vm/calendar_vm';
import { calendarStore, CalendarState, scheduleStore, ScheduleState, ScheduleData } from '@store/global_store';

import ScheduleEditorContainer from './time_table/schedule_component/schedule_editor_container';
import ScheduleContentsPresenter from './time_table/schedule_component/schedule_contents_presenter';

type Props = {
  presentDay: Moment;
  color: string;
};

type BorderState = {
  width: string;
  color: string;
};

const DayContainer = ({ presentDay, color }: Props): ReactElement => {
  // const today = moment();
  // 렌더링 횟수가 너무 많음. 인터랙션도 많기때문에 개선 필요
  const [calendarState, setCalendarState] = useState<CalendarState>(calendarStore.initialState);
  const [selectedBorder, setBorderState] = useState<BorderState>({
    width: 'thin',
    color: 'black',
  });
  const [todayColor, setTodayState] = useState<string>('white');
  const [scheduleState, setScheduleState] = useState<ScheduleState>(scheduleStore.initialState);
  const dayCell = useRef(null);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);
    const scheduleStoreSubs = scheduleStore.init(setScheduleState);

    return () => {
      scheduleStoreSubs.unsubscribe();
      calendarStoreSubs.unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    const onDayClicked = fromEvent(dayCell.current as any, 'click').subscribe(() =>
      CalendarVM.setSelectedDate(presentDay),
    );

    return () => {
      onDayClicked.unsubscribe();
    };
  }, [calendarState.currentDate]);

  useEffect(() => {
    if (!calendarState.selectedDate) return;
    if (calendarState.selectedDate.isSame(presentDay, 'day')) {
      setBorderState({
        width: 'medium',
        color: 'crimson',
      });
    } else {
      setBorderState({
        width: 'thin',
        color: 'black',
      });
    }
  }, [calendarState.selectedDate]);

  let dayClickListener: Observable<any> | undefined;
  if (dayCell.current) dayClickListener = fromEvent(dayCell.current as any, 'dblclick');

  let firstSchedule: ScheduleData | undefined;
  Array(24)
    .fill(0)
    .find((_: number, index: number) => {
      const key = presentDay.clone().startOf('d').add(index, 'h').format(SCHEDULE_MAP_KEY_FORMAT);
      const value = scheduleState.scheduleMap.get(key);
      if (value) {
        firstSchedule = value;
        return true;
      }
      return false;
    });
  const justify = 'center';

  return (
    <>
      <Col
        ref={dayCell}
        span={3}
        style={{
          border: '1px solid black',
          fontSize: '1.3rem',
          color,
          borderWidth: selectedBorder.width,
          borderColor: selectedBorder.color,
          backgroundColor: todayColor, // 미구현
        }}
      >
        <Row justify={justify}>{presentDay.format('D')}</Row>
        <Row justify={justify} style={{ color: 'black' }}>
          {' '}
          <ScheduleContentsPresenter contents={firstSchedule?.content} />
        </Row>
      </Col>
      <ScheduleEditorContainer scheduleEvent={dayClickListener} selectedTime={presentDay} value={firstSchedule} />
    </>
  );
};

export default DayContainer;
