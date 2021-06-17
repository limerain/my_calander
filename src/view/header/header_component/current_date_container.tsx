import React, { ReactElement } from 'react';
import moment from 'moment';

const CurrentDateContainer = (): ReactElement => {
  const date = moment();
  return <p>{date.format('YYYY년 MM월')}</p>;
};

export default CurrentDateContainer;
