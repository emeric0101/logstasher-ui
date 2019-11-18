import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Batch } from '../batch';
import { BatchesService } from '../batches.service';

@Component({
  selector: 'app-edit-rest-request',
  templateUrl: './edit-rest-request.component.html',
  styleUrls: ['./edit-rest-request.component.scss']
})
export class EditRestRequestComponent implements OnInit {
  @Input() batch: Batch;
  @Output() onFinish = new EventEmitter();

  displayNew = false;

  constructor(
    private batchService: BatchesService
  ) { }
  
  ngOnInit() {
  }

  delete(item) {
    this.batch.entyRequests = this.batch.entyRequests.filter(e => e != item);
    this.batchService.save(this.batch);
   }

  onCancel() {
    this.onFinish.emit();
  }

}
