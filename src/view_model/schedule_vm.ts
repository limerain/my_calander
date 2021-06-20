import { of } from 'rxjs';
import { scheduleStore, ScheduleState, ScheduleData } from '@store/global_store';
import { ScheduleState as ViewData } from '@view/contents/calendars/time_table/schedule_component/schedule_editor_container';
import ScheduleService from '@model/schedule_service';

class ScheduleViewModel {
  public getSchedule() {
    // with monthly data
  }

  public async setSchedule(key: string, contents: ViewData) {
    if (!contents.content || !contents.endDate || !contents.endTime || !contents.startDate || !contents.startTime) {
      throw new Error('schedule data error');
    }

    const startTime = contents.startDate.clone().startOf('D').add({
      hours: contents.startTime.hour(),
      minutes: contents.startTime.minute(),
      seconds: contents.startTime.seconds(),
    });
    const endTime = contents.endDate.clone().startOf('D').add({
      hours: contents.endTime.hour(),
      minutes: contents.endTime.minute(),
      seconds: contents.endTime.seconds(),
    });

    const scheduleData: ScheduleData = {
      content: contents.content,
      startTime,
      endTime,
    };

    // model job
    try {
      await ScheduleService.saveSchedule(key, scheduleData);
      const map = scheduleStore.getData().scheduleMap;
      map.set(key, scheduleData);
      scheduleStore.addSchedule(map);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public updateSchedule() {
    //
  }

  public deleteSchedule() {
    //
  }
}

const ScheduleVM = new ScheduleViewModel();
export default ScheduleVM;
