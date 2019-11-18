import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestRequest, Batch } from '../../batch';
import { BatchesService } from '../../batches.service';

@Component({
  selector: 'app-new-rest-request',
  templateUrl: './new-rest-request.component.html',
  styleUrls: ['./new-rest-request.component.css']
})
export class NewRestRequestComponent implements OnInit {
  method: string;
  methods = [
    {label: 'GET', value: 'GET'},
    {label: 'POST', value: 'POST'},
    {label: 'DELETE', value: 'DELETE'},
    {label: 'PUT', value: 'PUT'},
  ]

  type: string;
  types = [
    {label: 'BEFORE', value: 'BEFORE'},
    {label: 'AFTER', value: 'AFTER'}
  ]

  @Output() onEnd = new EventEmitter();
  request = new RestRequest();
  @Input() batch: Batch;
  

  constructor(
    private batchService: BatchesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.batch.entyRequests) {
      this.batch.entyRequests = [];
    }
    this.batch.entyRequests.push(this.request);
    this.batchService.save(this.batch);
    //
    this.onEnd.emit();
  }

  onCancel() {
    this.onEnd.emit();
  }
}
