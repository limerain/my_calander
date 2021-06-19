import React, { ReactElement } from 'react';
import { Row, Col } from 'antd';
import { nanoid } from 'nanoid';

const dayOfWeek: Array<string> = ['일', '월', '화', '수', '목', '금', '토'];
const DayofWeekPresenter = (): ReactElement => {
  return (
    <Row>
      {dayOfWeek.map(function mappingWeekName(v: string) {
        return (
          <Col key={nanoid()} span={3} style={{ textAlign: 'center' }}>
            {' '}
            {v}
          </Col>
        );
      })}
    </Row>
  );
};

export default DayofWeekPresenter;
