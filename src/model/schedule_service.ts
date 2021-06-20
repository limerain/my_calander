import ScheduleRepository from '@model/schedule_repository';
import { ScheduleModel } from '@model/schedule_entity';
import { ScheduleData } from '@store/global_store';
import { HOSTURL } from '@constant';

class ScheduleService {
  private repository_: ScheduleRepository;

  constructor() {
    this.repository_ = new ScheduleRepository(HOSTURL);
  }

  public saveSchedule(key: string, scheduleData: ScheduleData): Promise<void> {
    const scheduleModel = this.convertToModelData(scheduleData);
    return this.repository_.setScheduleData(key, scheduleModel);
  }

  private convertToModelData(scheduleData: ScheduleData): ScheduleModel {
    return {
      content: scheduleData.content,
      startTime: Number(scheduleData.startTime.format('X')),
      endTime: Number(scheduleData.endTime.format('X')),
    };
  }
}

const scheduleService = new ScheduleService();
export default scheduleService;
