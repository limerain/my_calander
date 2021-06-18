import StoreTemplate from '@store/store_util';
import { Moment } from 'moment';
import { CalendarMode, CalendarUnit } from '@constant';

export type CalendarState = {
  currentDate: Moment | null;
  currentMode: CalendarMode;
  currentUnit: CalendarUnit;
  error: string;
};

class CalendarStore extends StoreTemplate {
  constructor() {
    super({
      currentDate: null,
      currentMode: CalendarMode.Calendar,
      currentUnit: CalendarUnit.MONTHLY,
      error: '',
    });
  }

  public setMonthState(state: CalendarState) {
    this.nextState(state);
  }

  public setCurrentDate(date: Moment) {
    this.nextState({
      ...this.state_,
      currentDate: date,
    });
  }

  public setMonthStateError(error: any): void {
    this.nextState({
      ...this.state_,
      error,
    });
  }
}

const calendarStore = new CalendarStore();
export default calendarStore;
