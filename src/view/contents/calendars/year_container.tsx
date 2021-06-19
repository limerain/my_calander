import React, { ReactElement } from 'react';
import MonthContainer from './month_container';

const YearContainer = (): ReactElement => {
  // will be use when extend to yearly calendar
  return <MonthContainer key={`my-year-container-${1}`} />;
};

export default YearContainer;
