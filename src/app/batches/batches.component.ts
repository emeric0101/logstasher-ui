import {Component, Input, OnInit} from '@angular/core';
import {Batch, ExecutorEnum, RecurrenceEnum} from './batch';
import { BatchesService } from './batches.service';
import { LogstasherService } from '../console/logstasher.service';
import {RecurrenceSettingComponent} from "./recurrence-setting/recurrence-setting.component";
import {SortEvent} from "primeng/api";
import {delay} from "rxjs/operators";

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

  working = false;

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
      const batches = await this.batchesService.findAll(this.executor);
      // add timestamp for sorting
      batches.forEach(e => e['startTime'] = e.startHour*60 + e.startMinute);
      batches.sort((a,b) => a.id.localeCompare(b.id)); // to avoid es sort issue
      this.batches = batches;
    } catch (exception) {
      this.errorMsg = 'Unable to join server';
    }
  }
  async save(p: Batch) {
    this.working = true;
    try {
      await this.batchesService.save(p);
      await this.ngOnInit()
    }
    finally {
      this.working = false;
    }
  }
  async delete(p: Batch) {
    this.working = true;
    try {
      const c = confirm('Are you sure ?');
      if (!c) {
        return;
      }
      await this.batchesService.delete(p);
      await this.ngOnInit()
    }
    finally {
      this.working = false;
    }

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
