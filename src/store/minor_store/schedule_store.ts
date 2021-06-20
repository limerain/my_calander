import StoreTemplate from '@store/store_util';
import { Moment } from 'moment';
// import { CalendarUnit } from '@constant';

export type ScheduleData = {
  content: string;
  startTime: Moment;
  endTime: Moment;
};

export type ScheduleState = {
  scheduleMap: Map<string, ScheduleData>;
  error: string;
};

class ScheduleStore extends StoreTemplate {
  constructor() {
    super({
      scheduleMap: new Map(),
      error: '',
    });
  }

  public addSchedule(scheduleMap: Map<string, ScheduleData>): void {
    this.nextState({
      ...this.state_,
      scheduleMap,
    });
  }
}
const scheduleStore = new ScheduleStore();
export default scheduleStore;
