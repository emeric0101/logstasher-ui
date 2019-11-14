import { Component, OnInit } from '@angular/core';
import { Batch } from './batch';
import { BatchesService } from './batches.service';
import { ConsoleService } from '../console/console.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {
  batches: Batch[];
  editBatch: Batch = null;

  displayEdit = false;

  errorMsg = '';
  constructor(
    protected batchesService: BatchesService,
    protected consoleService: ConsoleService
  ) { }

  edit(va) {
    this.editBatch = va;
    this.displayEdit = true;
  }

  async ngOnInit() {
    this.displayEdit = false;
    try {
      this.batches = await this.batchesService.findAll();
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
    this.batchesService.start(p);
  }

  isLogstashRunning() {
    return this.consoleService.getIsBusy();
  }
}
