import React, { ReactElement } from 'react';
import { Row } from 'antd';
import { nanoid } from 'nanoid';

type Props = {
  time: string;
};

const TimeHeaderPresenter = ({ time }: Props): ReactElement => {
  const JUSTIFY_ALIGNMENT = 'end';

  return (
    <Row key={nanoid()} justify={JUSTIFY_ALIGNMENT} style={{ border: '1px solid black', height: '2.95rem' }}>
      {' '}
      {time}
    </Row>
  );
};

export default TimeHeaderPresenter;
