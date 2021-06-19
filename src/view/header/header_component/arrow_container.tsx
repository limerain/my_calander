import React, { ReactElement, useLayoutEffect, useRef } from 'react';
import { Button } from 'antd';
import { fromEvent, iif } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CalendarVM from '@vm/calendar_vm';

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
        mergeMap(() => iif(() => direction === Direction.LEFT, CalendarVM.movePrevMonth(), CalendarVM.moveNextMonth())),
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
