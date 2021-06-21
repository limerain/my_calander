import React, { ReactElement, useState, useLayoutEffect } from 'react';
import { Moment } from 'moment';
import { Modal, Input, Button, DatePicker, TimePicker, message } from 'antd';
import { Observable } from 'rxjs';

import ScheduleVM from '@vm/schedule_vm';
import { SCHEDULE_MAP_KEY_FORMAT } from '@constant';
import { ScheduleData } from '@store/global_store';

type Props = {
  scheduleEvent: Observable<any> | undefined;
  selectedTime: Moment;
  value: ScheduleData | undefined;
  //   presentTime: Moment;
};

export type ScheduleState = {
  isExist: boolean;
  content: string | null;
  startTime: Moment | null;
  endTime: Moment | null;
  startDate: Moment | null; // VM에는 최종적으로 Date + Time이 합쳐진 데이터 하나만 저장함. 여기서는 데이터 검증을 위해 분리함
  endDate: Moment | null; // VM에는 최종적으로 Date + Time이 합쳐진 데이터 하나만 저장함. 여기서는 데이터 검증을 위해 분리함
};

const ScheduleEditorContainer = ({ scheduleEvent, selectedTime, value }: Props): ReactElement => {
  const TIME_PICKER_FORMAT = 'HH:mm';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [localScheduleState, setScheduleState] = useState<ScheduleState>({
    isExist: value !== undefined,
    content: value ? value.content : null,
    startTime: value ? value.startTime.clone() : selectedTime,
    endTime: value ? value.endTime.clone() : null,
    startDate: value ? value.startTime.clone().startOf('d') : selectedTime,
    endDate: value ? value.endTime.clone().startOf('d') : null,
  });
  const modalPlaceholder = `일정을 입력해주세요.`;
  const applyText = localScheduleState.isExist ? '편집' : '확인';

  useLayoutEffect(() => {
    const onScheduleClicked = scheduleEvent?.subscribe(() => setIsModalVisible(true));

    return () => {
      onScheduleClicked?.unsubscribe();
    };
  }, [scheduleEvent]);

  const handleSuccess = () => {
    setScheduleState({
      ...localScheduleState,
      isExist: true,
    });
    setIsModalVisible(false);
    setConfirmLoading(false);
  };
  const handleDeleteSuccess = () => {
    setScheduleState({
      ...localScheduleState,
      isExist: false,
    });
    setIsModalVisible(false);
    setConfirmLoading(false);
  };
  const handleError = (error: Error) => {
    message.error(error.message);
    setIsModalVisible(false);
    setConfirmLoading(false);
  };

  const setSchedule = () => {
    ScheduleVM.setSchedule(selectedTime.format(SCHEDULE_MAP_KEY_FORMAT), localScheduleState)
      .then(handleSuccess)
      .catch(handleError);
  };

  const editSchedule = () => {
    ScheduleVM.updateSchedule(selectedTime.format(SCHEDULE_MAP_KEY_FORMAT), localScheduleState)
      .then(handleSuccess)
      .catch(handleError);
  };

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
      setConfirmLoading(true);
      if (!localScheduleState.isExist) setSchedule();
      else editSchedule();
    }
  };
  const handleDelete = () => {
    if (!localScheduleState.startTime) {
      message.error('삭제 정보가 올바르지 않습니다.');
      return;
    }
    setConfirmLoading(true);
    ScheduleVM.deleteSchedule(localScheduleState.startTime.format(SCHEDULE_MAP_KEY_FORMAT))
      .then(handleDeleteSuccess)
      .catch(handleError);
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
        localScheduleState.isExist && (
          <Button key="delete" onClick={handleDelete} loading={confirmLoading}>
            삭제
          </Button>
        ),
        <Button key="apply" type="primary" onClick={handleOk} loading={confirmLoading}>
          {applyText}
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          취소
        </Button>,
      ]}
    >
      일정
      <Input
        defaultValue={localScheduleState.content ? localScheduleState.content : undefined}
        placeholder={modalPlaceholder}
        onChange={onContentChanged}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            시작 날짜
            <DatePicker
              defaultValue={localScheduleState.startDate ? localScheduleState.startDate : undefined}
              disabled
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
              defaultValue={localScheduleState.startTime ? localScheduleState.startTime : undefined}
              disabled
              format={TIME_PICKER_FORMAT}
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
              defaultValue={localScheduleState.endDate ? localScheduleState.endDate : undefined}
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
              defaultValue={localScheduleState.endTime ? localScheduleState.endTime : undefined}
              format={TIME_PICKER_FORMAT}
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
