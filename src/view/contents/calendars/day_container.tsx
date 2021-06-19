import React, { ReactElement } from 'react';
import { Col } from 'antd';

type Props = {
  today: string;
  color: string;
};

const DayContainer = ({ today, color }: Props): ReactElement => {
  return (
    <Col span={3} style={{ border: '1px solid black', textAlign: 'center', fontSize: '1.3rem', color }}>
      {today}
    </Col>
  );
};

export default DayContainer;
