import React, { ReactElement, useRef } from 'react';
import { Moment } from 'moment';
import { Row } from 'antd';
import { nanoid } from 'nanoid';
import ScheduleEditorContainer from './schedule_editor_container';

type Props = {
  presentTime: Moment;
};

const ScheduleContainer = ({ presentTime }: Props): ReactElement => {
  const scheduleCell = useRef(null);

  return (
    <>
      <Row key={nanoid()} style={{ width: '100%', border: '1px solid black', height: '2.95rem' }} ref={scheduleCell}>
        {' '}
      </Row>
      <ScheduleEditorContainer selectedTime={presentTime} scheduleCell={scheduleCell} />
    </>
  );
};

export default ScheduleContainer;
