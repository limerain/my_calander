import React, { ReactElement } from 'react';
import DayofWeekPresenter from './calendar_header/day_of_week_presenter';
import WeeklyContainer from './weekly_container';

const WEEKINMONTH = 6;

const MonthlyCalendarContainer = (): ReactElement => {
  const weekInMonthContainer: ReactElement[] = [];
  for (let i = 0; i < WEEKINMONTH; i++) {
    weekInMonthContainer.push(<WeeklyContainer />);
  }
  return (
    <>
      <DayofWeekPresenter />
      {weekInMonthContainer}
    </>
  );
};

export default MonthlyCalendarContainer;
