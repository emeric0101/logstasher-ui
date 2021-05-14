export class Batch {
  id: string;
  lastTime: string;
  activated: boolean;
  content: string;
  order: number;
  startHour: number;
  startMinute: number;
  timeout: number;
  entyRequests: RestRequest[];

  recurrence: RecurrenceEnum = RecurrenceEnum.Daily;
  weekDays: number[];
  monthDate: number;
  executor: ExecutorEnum;
  talendPowershellName?: string;
}
export enum ExecutorEnum {
  LOGSTASH_BATCH = 'LOGSTASH_BATCH',
  LOGSTASH_PIPELINE = 'LOGSTASH_PIPELINE',
  TALEND = 'TALEND'
}

export class RestRequest {
  url: string;
  type: string;
  body: string;
  method: string;
}

export enum RecurrenceEnum {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly'
}
