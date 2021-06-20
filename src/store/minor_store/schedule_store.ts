import StoreTemplate from '@store/store_util';
// import { Moment } from 'moment';
// import { CalendarUnit } from '@constant';

export type ScheduleState = {
  error: string;
};

class ScheduleStore extends StoreTemplate {
  constructor() {
    super({
      error: '',
    });
  }
}
const scheduleStore = new ScheduleStore();
export default scheduleStore;
