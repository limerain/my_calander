import { CalendarUnit } from '@constant';
import moment, { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { calendarStore, CalendarState } from '../store/global_store';
// import { from, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

class CalendarViewModel {
  public initDate(): void {
    // calendarStore.setCurrentDate(moment());
    const data = calendarStore.getData() as CalendarState;
    calendarStore.setMonthState({
      ...data,
      currentDate: moment(),
      selectedDate: moment(),
    });
  }

  // public movePrevMonth(): Observable<void> {
  //   return of(calendarStore.getData().currentDate).pipe(
  //     map((currentDate: Moment) => calendarStore.setCurrentDate(currentDate.clone().add(-1, 'M'))),
  //   );
  // }

  // public moveNextMonth(): Observable<void> {
  //   return of(calendarStore.getData().currentDate).pipe(
  //     map((currentDate: Moment) => calendarStore.setCurrentDate(currentDate.clone().add(1, 'M'))),
  //   );
  // }

  public movePrevMonth(): Observable<void> {
    return of(calendarStore.getData().currentDate).pipe(
      map((currentDate: Moment) => {
        const newerMonth = currentDate.clone().add(-1, 'M');
        calendarStore.setCurrentDate(newerMonth);
        return newerMonth;
      }),
      map((newerMonth: Moment) => calendarStore.setSelectedDate(newerMonth.startOf('D'))),
    );
  }

  public moveNextMonth(): Observable<void> {
    return of(calendarStore.getData().currentDate).pipe(
      map((currentDate: Moment) => {
        const newerMonth = currentDate.clone().add(1, 'M');
        calendarStore.setCurrentDate(newerMonth);
        return newerMonth;
      }),
      map((newerMonth: Moment) => calendarStore.setSelectedDate(newerMonth.startOf('D'))),
    );
  }

  public setCurrentUnit(unit: CalendarUnit): void {
    calendarStore.setCalendarUnit(unit);
  }

  public setSelectedDate(date: Moment): void {
    calendarStore.setSelectedDate(date);
  }

  public setCurrentDatetoSelectedDate(): void {
    calendarStore.setCurrentDate(calendarStore.getData().selectedDate);
  }

  // public setCurrentDatetoSelectedDate(): Observable<void> {
  //   return of(calendarStore.getData().selectedDate).pipe(
  //     map((selectedDate: Moment) => calendarStore.setCurrentDate(selectedDate)),
  //   );
  // }

  // public setCurrentDatetoSelectedDate(): Observable<void> {
  //   return of(calendarStore.getData().selectedDate).pipe(
  //     map((selectedDate: Moment) => calendarStore.setCurrentDate(selectedDate)),
  //   );
  // }
}

const CalendarVM = new CalendarViewModel();
export default CalendarVM;
