import React, { ReactElement, useState, useRef, useLayoutEffect } from 'react';
import { Moment } from 'moment';
import { Row, Modal, Input, Button, DatePicker, TimePicker } from 'antd';
import { nanoid } from 'nanoid';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
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
