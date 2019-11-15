import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Batch } from '../batch';

@Component({
  selector: 'app-edit-rest-request',
  templateUrl: './edit-rest-request.component.html',
  styleUrls: ['./edit-rest-request.component.scss']
})
export class EditRestRequestComponent implements OnInit {
  @Input() batch: Batch;
  @Output() onFinish = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
