import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Batch, ExecutorEnum, RecurrenceEnum} from '../batch';
import {BatchesService} from '../batches.service';


@Component({
  selector: 'app-batches-create',
  templateUrl: './batches-create.component.html',
  styleUrls: ['./batches-create.component.scss']
})
export class BatchesCreateComponent implements OnInit {
  @Output() updated = new EventEmitter();
  batch: Batch = {
    id: "",
    content: "",
    activated: false,
    lastTime: null,
    order: 1,
    startHour: 23,
    startMinute: 0,
    timeout: 60,
    entyRequests: [],
    recurrence: RecurrenceEnum.Daily,
    weekDays: [],
    monthDate: null,
    executor: ExecutorEnum.LOGSTASH_BATCH
  };
  batchExecutorOptions = [
    {
      label: 'LOGSTASH_BATCH', value: ExecutorEnum.LOGSTASH_BATCH
    },
    {
      label: 'LOGSTASH_PIPELINE', value: ExecutorEnum.LOGSTASH_PIPELINE
    },
    {
      label: 'TALEND', value: ExecutorEnum.TALEND
    }
  ];
  ExecutorEnum = ExecutorEnum;

  constructor(
    private batchService: BatchesService
  ) {
  }

  ngOnInit() {
  }

  async submit() {
    if (this.batch.id == "" || this.batch.content == null) {
      return;
    }
    await this.batchService.save(this.batch);
    setTimeout(() => this.updated.emit(), 1000);
  }

  uploadHandler($event) {
    if ($event.files && $event.files.length > 0) {
      var reader = new FileReader();
      reader.onload = (result) => {
        this.batch.content = reader.result as string;
      }
      reader.readAsText($event.files[0]);
    }
  }

  fixId() {
    this.batch.id = this.batch.id.split('/').join('');
  }

}
