import React, { ReactElement } from 'react';

type Props = {
  time: string;
};

const ScheduleTimePresenter = ({ time }: Props): ReactElement => {
  return <>{time}</>;
};

export default ScheduleTimePresenter;
