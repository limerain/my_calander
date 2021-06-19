import React, { ReactElement, useState, useLayoutEffect, useRef } from 'react';
import { Button } from 'antd';
import { fromEvent, iif } from 'rxjs';
import { map, tap, filter, mergeMap } from 'rxjs/operators';

import { calendarStore, CalendarState } from '@store/global_store';
import { CalendarUnit } from '@constant';
import CalendarVM from '@vm/calendar_vm';

type Props = {
  unit: CalendarUnit;
};

const CalendarSelectorContainer = ({ unit }: Props): ReactElement => {
  const [calendarState, setCalendarState] = useState<CalendarState>(calendarStore.initialState);
  const selectorButton = useRef(null);

  useLayoutEffect(() => {
    const calendarStoreSubs = calendarStore.init(setCalendarState);
    const onSelectorClicked = fromEvent(selectorButton.current as any, 'click')
      .pipe(
        map((event: any) => event.srcElement.innerText),
        tap((selectedUnit: CalendarUnit) => CalendarVM.setCurrentUnit(selectedUnit)),
        // mergeMap((selectedUnit: CalendarUnit) =>
        //   iif(
        //     () => selectedUnit === CalendarUnit.DAILY,
        //     CalendarVM.setCurrentDatetoSelectedDate(),
        //     CalendarVM.setCurrentDatetoSelectedDate(),
        //   ),
        // ),
        filter((selectedUnit: CalendarUnit) => selectedUnit === CalendarUnit.DAILY),
        tap(() => CalendarVM.setCurrentDatetoSelectedDate()),
      )
      .subscribe();

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
