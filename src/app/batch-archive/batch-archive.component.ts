import {Component, OnDestroy, OnInit} from '@angular/core';
import { BatchesService } from '../batches/batches.service';
import { BatchArchive } from '../batches/batch-archive.class';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-batch-archive',
  templateUrl: './batch-archive.component.html',
  styleUrls: ['./batch-archive.component.scss']
})
export class BatchArchiveComponent implements OnInit, OnDestroy {
  sub: Subscription;
  archives: BatchArchive[];
  constructor(
    protected batchService: BatchesService
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async ngOnInit() {
    await this.init();
    this.sub = this.batchService.updated.subscribe(() => {
      this.init();
    })
  }

  async init() {
    this.archives = await this.batchService.findArchiveWeek();
  }

  computeTotal(item: BatchArchive) {
    if (item.startTime && item.endTime) {
      const start = new Date(item.startTime);
      const end = new Date(item.endTime);
      return Math.round((end.getTime()-start.getTime())/60000);
    } else {
      return '';
    }
  }
}
