import React, { ReactElement, useState, useLayoutEffect, useRef } from 'react';
import { Button } from 'antd';
import { calendarStore, CalendarState } from '@store/global_store';
import { CalendarUnit } from '@constant';
import CalendarVM from '@vm/calendar_vm';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

type Props = {
  unit: CalendarUnit;
};

const CalendarSelectorContainer = ({ unit }: Props): ReactElement => {
  const [calendarState, setCalendarState] = useState<CalendarState>(calendarStore.initialState);
  const selectorButton = useRef(null);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);
    const onSelectorClicked = fromEvent(selectorButton.current as any, 'click')
      .pipe(map((event: any) => event.srcElement.innerText))
      .subscribe((selectedUnit: CalendarUnit) => CalendarVM.setCurrentUnit(selectedUnit));

    return () => {
      calendarStoreSubs.unsubscribe();
      onSelectorClicked.unsubscribe();
    };
  }, []);
  const type: any = unit === calendarState.currentUnit ? 'primary' : 'default';

  return (
    <Button type={type} ref={selectorButton}>
      {unit}
    </Button>
  );
};

export default CalendarSelectorContainer;
