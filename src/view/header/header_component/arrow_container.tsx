import React, { ReactElement, useLayoutEffect, useRef } from 'react';
import { Button } from 'antd';
import { fromEvent, iif } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CalendarVM from '@vm/calendar_vm';
import ScheduleVM from '@vm/schedule_vm';
import { Moment } from 'moment';

type Props = {
  direction: Direction;
};

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
}

const ArrowContainer = ({ direction }: Props): ReactElement => {
  const BUTTONTYPE = 'text';
  const arrowButton = useRef(null);

  useLayoutEffect(() => {
    const onArrowClicked = fromEvent(arrowButton.current as any, 'click')
      .pipe(
        mergeMap(() => iif(() => direction === Direction.LEFT, CalendarVM.movePrev(), CalendarVM.moveNext())),
        mergeMap((newerMonth: Moment) => ScheduleVM.cacheNextMonthSchedule(newerMonth.format('YYYY-MM'))),
      )
      .subscribe();
    return () => {
      onArrowClicked.unsubscribe();
    };
  }, []);

  if (direction === Direction.LEFT) {
    return <Button type={BUTTONTYPE} icon={<LeftOutlined />} ref={arrowButton} />;
  }
  return <Button type={BUTTONTYPE} icon={<RightOutlined />} ref={arrowButton} />;
};

export default ArrowContainer;
