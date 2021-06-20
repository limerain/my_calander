import React, { ReactElement } from 'react';

type Props = {
  contents: string;
};

const ScheduleContentsPresenter = ({ contents }: Props): ReactElement => {
  return <>{contents}</>;
};

export default ScheduleContentsPresenter;
