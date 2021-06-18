import React, { ReactElement } from 'react';
import { Button } from 'antd';

export enum CalendarUnit {
  MONTHLY = '월',
  DAILY = '일',
}

type Props = {
  unit: CalendarUnit;
};

const CalendarSelectorContainer = ({ unit }: Props): ReactElement => {
  const currentState = CalendarUnit.MONTHLY;
  // primary ghost dashed link text default
  const type = unit === currentState ? 'primary' : 'default';

  return <Button type={type}>{unit}</Button>;
};

export default CalendarSelectorContainer;
