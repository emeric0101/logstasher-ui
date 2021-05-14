import {Component, Input, OnInit} from '@angular/core';
import {Batch, ExecutorEnum, RecurrenceEnum} from './batch';
import { BatchesService } from './batches.service';
import { LogstasherService } from '../console/logstasher.service';
import {RecurrenceSettingComponent} from "./recurrence-setting/recurrence-setting.component";

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {
  batches: Batch[];
  editBatch: Batch = null;

  displayEdit = false;
  displayNew = false;
  displayRestEdit = false;

  errorMsg = '';
  RecurrenceEnum = RecurrenceEnum;
  weekOptions = RecurrenceSettingComponent.weekDaysOptions;

  @Input() executor: ExecutorEnum;

  constructor(
    protected batchesService: BatchesService,
    protected consoleService: LogstasherService
  ) { }

  edit(va) {
    this.editBatch = va;
    this.displayEdit = true;
  }
  editRest(va) {
    this.editBatch = va;
    this.displayRestEdit = true;
  }

  async ngOnInit() {
    this.displayEdit = false;
    try {
      this.batches = await this.batchesService.findAll(this.executor);
    } catch (exception) {
      this.errorMsg = 'Unable to join server';
    }
  }
  async save(p: Batch) {
    await this.batchesService.save(p);
    setTimeout(e => this.ngOnInit(), 1000);
  }
  async delete(p: Batch) {
    const c = confirm('Are you sure ?');
    if (!c) {
      return;
    }
    await this.batchesService.delete(p);
    setTimeout(e => this.ngOnInit(), 1000);
  }

  start(p: Batch) {
    this.consoleService.startBatch(p.id);
  }

  isLogstashRunning() {
    return this.consoleService.getIsBusy(this.executor);
  }

  onNewBatch() {
    this.displayNew = true;
  }

  pad(v) {
    return ("" + v).padStart(2, "0");
  }
}
