import { of } from 'rxjs';
import { scheduleStore, ScheduleData } from '@store/global_store';
import { ScheduleState as ViewData } from '@view/contents/calendars/time_table/schedule_component/schedule_editor_container';
import ScheduleService from '@model/schedule_service';

class ScheduleViewModel {
  public getSchedule() {
    // with monthly data
  }

  public async setSchedule(key: string, contents: ViewData): Promise<void> {
    try {
      const scheduleData: ScheduleData = this.mapViewDataToVmData(contents);
      // model job
      await ScheduleService.createSchedule(key, scheduleData);

      // state job
      const map = scheduleStore.getData().scheduleMap;
      map.set(key, scheduleData);
      scheduleStore.setSchedule(map);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateSchedule(key: string, contents: ViewData): Promise<void> {
    try {
      // model job
      const scheduleData: ScheduleData = this.mapViewDataToVmData(contents);
      await ScheduleService.updateSchedule(key, scheduleData);
      // state job
      const map = scheduleStore.getData().scheduleMap;
      map.set(key, scheduleData);
      scheduleStore.setSchedule(map);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteSchedule(key: string): Promise<void> {
    try {
      // model job
      await ScheduleService.deleteSchedule(key);
      // state job
      const map = scheduleStore.getData().scheduleMap;
      map.delete(key);
      scheduleStore.setSchedule(map);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private mapViewDataToVmData(contents: ViewData): ScheduleData {
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

    return {
      content: contents.content,
      startTime,
      endTime,
    };
  }
}

const ScheduleVM = new ScheduleViewModel();
export default ScheduleVM;
