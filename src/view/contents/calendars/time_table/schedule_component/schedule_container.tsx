import React, { ReactElement, useRef, useState, useLayoutEffect } from 'react';
import { Moment } from 'moment';
import { Row } from 'antd';
import { nanoid } from 'nanoid';
import { scheduleStore, ScheduleState } from '@store/global_store';
import { SCHEDULE_MAP_KEY_FORMAT } from '@constant';

import ScheduleEditorContainer from './schedule_editor_container';
import ScheduleTimePresenter from './schedule_time_presenter';
import ScheduleContentsPresenter from './schedule_contents_presenter';

type Props = {
  presentTime: Moment;
};

const ScheduleContainer = ({ presentTime }: Props): ReactElement => {
  const scheduleCell = useRef(null);
  const [scheduleState, setScheduleState] = useState<ScheduleState>(scheduleStore.initialState);

  useLayoutEffect(() => {
    const scheduleStoreSubs = scheduleStore.init(setScheduleState);

    return () => {
      scheduleStoreSubs.unsubscribe();
    };
  }, []);
  const key = presentTime.format(SCHEDULE_MAP_KEY_FORMAT);
  const value = scheduleState.scheduleMap.get(key);

  return (
    <>
      <Row style={{ width: '100%', border: '1px solid black', height: '2.95rem' }} ref={scheduleCell}>
        <ScheduleTimePresenter time={value ? value.endTime.format('~ YYYY-MM-DD HH:mm') : ''} />{' '}
        <ScheduleContentsPresenter contents={value?.content} />
      </Row>
      <ScheduleEditorContainer
        selectedTime={presentTime}
        scheduleEvent={{ elementRef: scheduleCell, event: 'click' }}
        value={value}
      />
    </>
  );
};

export default ScheduleContainer;
