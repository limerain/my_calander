import moment from 'moment';
import { calendarStore, CalendarState } from '../store/global_store';
// import { from, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

class CalendarViewModel {
  public initDate(): void {
    calendarStore.setCurrentDate(moment());
  }
}

const CalendarVM = new CalendarViewModel();
export default CalendarVM;
