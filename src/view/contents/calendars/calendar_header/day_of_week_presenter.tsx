import React, { ReactElement } from 'react';
import { Row, Col } from 'antd';

const dayOfWeek: Array<string> = ['일', '월', '화', '수', '목', '금', '토'];

const DayofWeekPresenter = (): ReactElement => {
  return (
    <Row style={{ display: 'flex', width: '600px' }}>
      {dayOfWeek.map(function (v: string) {
        return (
          <Col span={3} style={{ marginRight: '10px' }}>
            {' '}
            {v}
          </Col>
        );
      })}
    </Row>
  );
};

export default DayofWeekPresenter;
