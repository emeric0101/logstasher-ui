import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Batch, ExecutorEnum} from '../batch';
import { BatchesService } from '../batches.service';

@Component({
  selector: 'app-batches-edit',
  templateUrl: './batches-edit.component.html',
  styleUrls: ['./batches-edit.component.scss']
})
export class BatchesEditComponent implements OnInit {
  @Input() batch: Batch;
  @Output() onFinish = new EventEmitter();

  ExecutorEnum = ExecutorEnum;
  constructor(
    private service: BatchesService,
  ) { }

  save() {
    this.service.save(this.batch);
    this.onFinish.emit();
  }

  ngOnInit() {
  }

}
