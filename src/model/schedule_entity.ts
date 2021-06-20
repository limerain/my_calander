export type ScheduleModel = {
  content: string;
  startTime: number;
  endTime: number;
};

export default class ScheduleEntity {
  public content_: string;
  public startTime_: number;
  public endTime_: number;

  constructor({ content, startTime, endTime }: ScheduleModel) {
    this.content_ = content;
    this.startTime_ = startTime;
    this.endTime_ = endTime;
  }
}
