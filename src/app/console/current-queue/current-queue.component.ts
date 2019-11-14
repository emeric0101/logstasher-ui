import { Component, OnInit } from '@angular/core';
import { ExecutionBatch, ExecutionQueue } from '../execution-queue.class';
import { ConsoleService } from '../console.service';

@Component({
  selector: 'app-current-queue',
  templateUrl: './current-queue.component.html',
  styleUrls: ['./current-queue.component.scss']
})
export class CurrentQueueComponent implements OnInit {

  batches: ExecutionBatch[];
  currentBatch: ExecutionBatch;
  constructor(
    private consoleService: ConsoleService
  ) { }

  ngOnInit() {
    setInterval(() => {
      const queue: ExecutionQueue = this.consoleService.getCurrentQueue();
      if (queue) {
        this.batches = queue.queue;
        if (this.currentBatch) {
          this.currentBatch = this.batches.find(e => e.batch.id == this.currentBatch.batch.id);
        }
      }
    })
  }

  showConsole(b) {
    if (this.currentBatch && this.currentBatch.batch.id == b.batch.id) {
      this.currentBatch = null;
    } else {
      this.currentBatch = b;
    }
  }

}
