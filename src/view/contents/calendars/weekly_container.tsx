import React, { ReactElement } from 'react';
import { Row } from 'antd';
import { Moment } from 'moment';
import DayContainer from './day_container';

const WEEKDAY = 7;

type Props = {
  sundayofThisContainer: Moment;
  thisMonth: string;
};

const WeeklyContainer = ({ sundayofThisContainer, thisMonth }: Props): ReactElement => {
  const dayContainers: ReactElement[] = [];

  for (let i = 0; i < WEEKDAY; i++) {
    const nowDay = sundayofThisContainer.clone().add(i, 'd');
    const dateofDayContainer = nowDay.format('D');
    let color = i === 0 ? 'red' : 'black';
    color = nowDay.format('M') === thisMonth ? color : 'gainsboro';
    dayContainers.push(<DayContainer key={`my-week-calendar-${i}`} today={dateofDayContainer} color={color} />);
  }

  return <Row style={{ height: '14.2857143%' }}>{dayContainers}</Row>;
};

export default WeeklyContainer;
