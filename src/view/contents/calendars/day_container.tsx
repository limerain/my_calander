import React, { ReactElement, useRef, useLayoutEffect, useEffect, useState } from 'react';
import { Col } from 'antd';
import { fromEvent } from 'rxjs';
import { Moment } from 'moment';
import CalendarVM from '@vm/calendar_vm';
import { calendarStore, CalendarState } from '@store/global_store';

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
  const dayCell = useRef(null);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);
    const onDayClicked = fromEvent(dayCell.current as any, 'click').subscribe(() =>
      CalendarVM.setSelectedDate(presentDay),
    );

    return () => {
      calendarStoreSubs.unsubscribe();
      onDayClicked.unsubscribe();
    };
  }, []);

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

  return (
    <Col
      ref={dayCell}
      span={3}
      style={{
        border: '1px solid black',
        textAlign: 'center',
        fontSize: '1.3rem',
        color,
        borderWidth: selectedBorder.width,
        borderColor: selectedBorder.color,
        backgroundColor: todayColor, // 미구현
      }}
    >
      {presentDay.format('D')}
    </Col>
  );
};

export default DayContainer;
