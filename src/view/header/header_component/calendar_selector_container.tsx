import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { Button } from 'antd';
import { calendarStore, CalendarState } from '@store/global_store';
import { CalendarUnit } from '@constant';

type Props = {
  unit: CalendarUnit;
};

const CalendarSelectorContainer = ({ unit }: Props): ReactElement => {
  // const currentState = CalendarUnit.MONTHLY;
  // primary ghost dashed link text default
  const [calendarState, setCalendarState] = useState<CalendarState>(calendarStore.initialState);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);
    const clearFunction = () => {
      calendarStoreSubs.unsubscribe();
    };

    return clearFunction;
  }, [calendarState.currentUnit]);
  const type: any = unit === calendarState.currentUnit ? 'primary' : 'default';
  console.log('type: ', type, ' unit: ', unit);

  return <Button type={type}>{unit}</Button>;
};

export default CalendarSelectorContainer;
