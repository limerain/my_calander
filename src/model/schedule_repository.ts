import axios from 'axios';
import ScheduleEntity, { ScheduleModel } from '@model/schedule_entity';

export default class ScheduleRepository {
  private entities_: Map<string, ScheduleEntity>;
  private scheduleApiUrl_: string;

  constructor(serverUrl: string) {
    this.entities_ = new Map();
    this.scheduleApiUrl_ = `${serverUrl}/api/schedule`;
  }

  public getMonthlySchedule(month: string): Promise<void> {
    // month: YYYY-MM, key: YYYY-MM-DD_HH
    // if (this.entities_.has(key))
    //   return Promise.reject(new Error('schedule data already exist. please try to update function'));
    // const monthlyData = moment(month);
    // console.log(monthlyData);
    return Promise.resolve();
  }

  public async setScheduleData(key: string, data: ScheduleModel): Promise<void> {
    if (this.entities_.has(key))
      return Promise.reject(new Error('schedule data already exist. please try to update function'));

    try {
      let response;
      if (this.scheduleApiUrl_ === 'https://my_schedule_server.co.kr/api/schedule') {
        // mocking code
        response = {
          data: {
            scheduleId: Math.random(),
          },
        };
      } else {
        response = await axios.post(this.scheduleApiUrl_, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      this.entities_.set(key, new ScheduleEntity(response.data.scheduleId, data));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateScheduleData(key: string, data: ScheduleModel): Promise<void> {
    try {
      let response;
      if (this.scheduleApiUrl_ === 'https://my_schedule_server.co.kr/api/schedule') {
        // mocking code
        response = {
          data: {
            scheduleId: Math.random(),
          },
        };
      } else {
        response = await axios.put(this.scheduleApiUrl_, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      this.entities_.set(key, new ScheduleEntity(response.data.scheduleId, data));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteScheduleData(key: string): Promise<void> {
    try {
      const entity = this.entities_.get(key);
      if (!entity) {
        throw new Error('There is no schedule data yet.');
      }

      let response;
      if (this.scheduleApiUrl_ === 'https://my_schedule_server.co.kr/api/schedule') {
        // mocking code
        response = {
          data: 'success',
        };
      } else {
        response = await axios.delete(`${this.scheduleApiUrl_}/${entity.scheduleId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      this.entities_.delete(key);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
