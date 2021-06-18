import React, { ReactElement } from 'react';
import { Row, Col } from 'antd';

const dayOfWeek: Array<string> = ['일', '월', '화', '수', '목', '금', '토'];

const DayofWeekPresenter = (): ReactElement => {
  return (
    <Row style={{ marginLeft: '50px', width: '30%' }}>
      {dayOfWeek.map(function (v: string) {
        return (
          <Col span={3} style={{ marginRight: '7px' }}>
            {' '}
            {v}
          </Col>
        );
      })}
    </Row>
  );
};

export default DayofWeekPresenter;
