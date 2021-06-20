import axios from 'axios';
import ScheduleEntity, { ScheduleModel } from '@model/schedule_entity';

export default class ScheduleRepository {
  private entities_: Map<string, ScheduleEntity>;
  private scheduleApiUrl_: string;

  constructor(serverUrl: string) {
    this.entities_ = new Map();
    this.scheduleApiUrl_ = `${serverUrl}/api/schedule`;
  }

  public getMonthlySchedule(month: string) {
    //
  }

  public async setScheduleData(key: string, data: ScheduleModel): Promise<void> {
    if (this.entities_.has(key))
      return Promise.reject(new Error('schedule data already exist. please try to update function'));

    try {
      // await axios.post(this.scheduleApiUrl_, JSON.stringify(data), {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      this.entities_.set(key, new ScheduleEntity(data));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
