import { CalendarUnit } from '@constant';
import moment, { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { calendarStore, CalendarState } from '../store/global_store';

class CalendarViewModel {
  public initDate(): void {
    const data = calendarStore.getData() as CalendarState;
    calendarStore.setMonthState({
      ...data,
      currentDate: moment(),
      selectedDate: moment(),
    });
  }

  public movePrev(): Observable<Moment> {
    return of(calendarStore.getData()).pipe(
      map((data: CalendarState) => {
        return {
          currentDate: data.currentDate!,
          currentUnit: data.currentUnit,
        };
      }),
      map((dateData: { currentDate: Moment; currentUnit: CalendarUnit }) => {
        const unit: any = dateData.currentUnit === CalendarUnit.MONTHLY ? 'M' : 'd';
        const newerMonth = dateData.currentDate.clone().add(-1, unit);
        calendarStore.setCurrentDate(newerMonth);
        return newerMonth;
      }),
      tap((newerMonth: Moment) => calendarStore.setSelectedDate(newerMonth.startOf('D'))),
    );
  }

  public moveNext(): Observable<Moment> {
    return of(calendarStore.getData()).pipe(
      map((data: CalendarState) => {
        return {
          currentDate: data.currentDate!,
          currentUnit: data.currentUnit,
        };
      }),
      map((dateData: { currentDate: Moment; currentUnit: CalendarUnit }) => {
        const unit: any = dateData.currentUnit === CalendarUnit.MONTHLY ? 'M' : 'd';
        const newerMonth = dateData.currentDate.clone().add(1, unit);
        calendarStore.setCurrentDate(newerMonth);
        return newerMonth;
      }),
      tap((newerMonth: Moment) => calendarStore.setSelectedDate(newerMonth.startOf('D'))),
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
}

const CalendarVM = new CalendarViewModel();
export default CalendarVM;
