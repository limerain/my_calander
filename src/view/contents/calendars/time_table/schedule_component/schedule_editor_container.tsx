import React, { ReactElement, useState, useRef, useLayoutEffect, MutableRefObject } from 'react';
import { Moment } from 'moment';
import { Row, Modal, Input, Button, DatePicker, TimePicker } from 'antd';
import { nanoid } from 'nanoid';
import { fromEvent, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

type Props = {
  scheduleCell: MutableRefObject<any>;
  selectedTime: Moment;
  //   presentTime: Moment;
};

const ScheduleEditorContainer = ({ scheduleCell, selectedTime }: Props): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // console.log('selected time: ', selectedTime);

  // schedule 있으면 다르게 떠야함
  const modalPlaceholder = `일정을 입력해주세요.`;
  const isExist = false;
  const applyText = isExist ? '편집' : '확인';

  useLayoutEffect(() => {
    const onScheduleClicked = fromEvent(scheduleCell.current as any, 'click').subscribe(() => setIsModalVisible(true));
    // .pipe(tap(() => console.log('presentTime: ', presentTime.format('YYYY-MM-DD-HH'))))

    return () => {
      onScheduleClicked.unsubscribe();
    };
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onContentChanged = () => {
    console.log('content changed');
  };
  const onStartDateChanged = () => {
    console.log('start date changed');
  };
  const onStartTimeChanged = () => {
    console.log('start time changed');
  };
  const onEndDateChanged = () => {
    console.log('end date changed');
  };
  const onEndTimeChanged = () => {
    console.log('end time changed');
  };

  return (
    <Modal
      title="일정 편집"
      visible={isModalVisible}
      footer={[
        isExist ? (
          <Button key="delete" onClick={handleOk}>
            삭제
          </Button>
        ) : (
          <></>
        ),
        <Button key="apply" type="primary" onClick={handleOk}>
          {applyText}
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          취소
        </Button>,
      ]}
    >
      일정
      <Input placeholder={modalPlaceholder} onChange={onContentChanged} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            시작 날짜
            <DatePicker onChange={onStartDateChanged} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            시작 시간
            <TimePicker onChange={onStartTimeChanged} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            종료 날짜
            <DatePicker onChange={onEndDateChanged} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            종료 시간
            <TimePicker onChange={onEndTimeChanged} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleEditorContainer;
