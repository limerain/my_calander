import React, { ReactElement } from 'react';

type Props = {
  contents: string | undefined;
};

const ScheduleContentsPresenter = ({ contents }: Props): ReactElement => {
  return <>{contents}</>;
};

export default ScheduleContentsPresenter;
