import StoreTemplate from '@store/store_util';
import { Moment } from 'moment';
import { CalendarUnit } from '@constant';

export type CalendarState = {
  currentDate: Moment | null;
  currentUnit: CalendarUnit;
  selectedDate: Moment | null;
  error: string;
};

class CalendarStore extends StoreTemplate {
  constructor() {
    super({
      currentDate: null,
      currentUnit: CalendarUnit.MONTHLY,
      selectedDate: null,
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

  public setCalendarUnit(unit: CalendarUnit) {
    this.nextState({
      ...this.state_,
      currentUnit: unit,
    });
  }

  public setSelectedDate(date: Moment) {
    this.nextState({
      ...this.state_,
      selectedDate: date,
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
