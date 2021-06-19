import { CalendarUnit } from '@constant';
import moment, { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { calendarStore } from '../store/global_store';
// import { from, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

class CalendarViewModel {
  public initDate(): void {
    calendarStore.setCurrentDate(moment());
  }

  public movePrevMonth(): Observable<void> {
    return of(calendarStore.getData().currentDate).pipe(
      map((currentDate: Moment) => calendarStore.setCurrentDate(currentDate.clone().add(-1, 'M'))),
    );
  }

  public moveNextMonth(): Observable<void> {
    return of(calendarStore.getData().currentDate).pipe(
      map((currentDate: Moment) => calendarStore.setCurrentDate(currentDate.clone().add(1, 'M'))),
    );
  }

  public setCurrentUnit(unit: CalendarUnit): void {
    calendarStore.setCalendarUnit(unit);
  }
}

const CalendarVM = new CalendarViewModel();
export default CalendarVM;
