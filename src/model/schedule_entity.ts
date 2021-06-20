export type ScheduleModel = {
  content: string;
  startTime: number;
  endTime: number;
};

export default class ScheduleEntity {
  public content: string;
  public startTime: number;
  public endTime: number;
  public scheduleId: number;

  constructor(scheduleId: number, { content, startTime, endTime }: ScheduleModel) {
    this.scheduleId = scheduleId;
    this.content = content;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
