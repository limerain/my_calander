import React, { ReactElement, useState, useRef, useLayoutEffect, MutableRefObject } from 'react';
import { Moment } from 'moment';
import { Row, Modal, Input, Button, DatePicker, TimePicker, message } from 'antd';
import { nanoid } from 'nanoid';
import { fromEvent, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

type Props = {
  scheduleCell: MutableRefObject<any>;
  selectedTime: Moment;
  //   presentTime: Moment;
};

type ScheduleState = {
  content: string | null;
  startTime: Moment | null;
  endTime: Moment | null;
  startDate: Moment | null;
  endDate: Moment | null;
};

const ScheduleEditorContainer = ({ scheduleCell, selectedTime }: Props): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localScheduleState, setScheduleState] = useState<ScheduleState>({
    content: null,
    startTime: null,
    endTime: null,
    startDate: null,
    endDate: null,
  });
  const endDateRef = useRef(null);
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
    if (
      !localScheduleState.content ||
      !localScheduleState.startTime ||
      !localScheduleState.endTime ||
      !localScheduleState.startDate ||
      !localScheduleState.endDate
    ) {
      message.error('입력사항이 올바르지 않습니다.');
    } else {
      setIsModalVisible(false);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onContentChanged = (event: any) => {
    const content = event.target.value === '' ? null : event.target.value;
    setScheduleState({
      ...localScheduleState,
      content,
    });
  };
  const onStartDateChanged = (startDate: Moment | null) => {
    // console.log('start date changed ', event?.format('X')); // to unix time
    setScheduleState({
      ...localScheduleState,
      startDate,
    });
  };
  const onStartTimeChanged = (startTime: Moment | null) => {
    setScheduleState({
      ...localScheduleState,
      startTime,
    });
  };
  const onEndDateChanged = (endDate: Moment | null) => {
    setScheduleState({
      ...localScheduleState,
      endDate,
    });
  };
  const onEndTimeChanged = (endTime: Moment | null) => {
    setScheduleState({
      ...localScheduleState,
      endTime,
    });
  };

  return (
    <Modal
      title="일정 편집"
      visible={isModalVisible}
      closable={false}
      footer={[
        isExist && (
          <Button key="delete" onClick={handleOk}>
            삭제
          </Button>
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
            <DatePicker
              onChange={onStartDateChanged}
              disabledDate={(date: Moment | null) => {
                if (localScheduleState.endDate && date && date.isAfter(localScheduleState.endDate, 'd')) return true;
                return false;
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            시작 시간
            <TimePicker
              onChange={onStartTimeChanged}
              disabledDate={(date: Moment | null) => {
                if (localScheduleState.startDate && date && localScheduleState.endDate && localScheduleState.endTime) {
                  const startTime = localScheduleState.startDate.clone().startOf('D').add({
                    hours: date.hour(),
                    minutes: date.minute(),
                    seconds: date.seconds(),
                  });
                  const endTime = localScheduleState.endDate.clone().startOf('D').add({
                    hours: localScheduleState.endTime.hour(),
                    minutes: localScheduleState.endTime.minute(),
                    seconds: localScheduleState.endTime.seconds(),
                  });
                  if (startTime.isAfter(endTime, 's')) return true;
                }
                return false;
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            종료 날짜
            <DatePicker
              ref={endDateRef}
              onChange={onEndDateChanged}
              disabledDate={(date: Moment | null) => {
                if (localScheduleState.startDate && date && date.isBefore(localScheduleState.startDate, 'd'))
                  return true;
                return false;
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            종료 시간
            <TimePicker
              onChange={onEndTimeChanged}
              disabledDate={(date: Moment | null) => {
                if (
                  localScheduleState.startDate &&
                  localScheduleState.startTime &&
                  localScheduleState.endDate &&
                  date
                ) {
                  const startTime = localScheduleState.startDate.clone().startOf('D').add({
                    hours: localScheduleState.startTime.hour(),
                    minutes: localScheduleState.startTime.minute(),
                    seconds: localScheduleState.startTime.seconds(),
                  });
                  const endTime = localScheduleState.endDate.clone().startOf('D').add({
                    hours: date.hour(),
                    minutes: date.minute(),
                    seconds: date.seconds(),
                  });
                  if (endTime.isBefore(startTime, 's')) return true;
                }
                return false;
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleEditorContainer;
