import {Component, OnDestroy, OnInit} from '@angular/core';
import { BatchesService } from '../batches/batches.service';
import { ExecutionArchive } from '../batches/batch-archive.class';
import {Subscription} from "rxjs";
import {LogstasherService} from "../console/logstasher.service";
import {Pipeline} from "../pipelines/pipeline";
import {ExecutionArchiveService} from "./execution-archive.service";

@Component({
  selector: 'app-execution-archive',
  templateUrl: './execution-archive.component.html',
  styleUrls: ['./execution-archive.component.scss']
})
export class ExecutionArchiveComponent implements OnInit, OnDestroy {
  sub: Subscription;
  archives: ExecutionArchive[];
  pipelines: ExecutionArchive[];
  batches: ExecutionArchive[];
  constructor(
    protected service: ExecutionArchiveService,
    protected logstashService: LogstasherService
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async ngOnInit() {
    await this.init();
    this.sub = this.logstashService.logstasherEvent.subscribe(() => {
      this.init();
    })
  }

  async init() {
    this.archives = await this.service.findArchiveWeek();
    this.batches = this.archives.filter(e => e.batch);
    this.pipelines = this.archives.filter(e => e.pipeline);
  }

  computeTotal(item: ExecutionArchive) {
    if (item.startTime && item.endTime) {
      const start = new Date(item.startTime);
      const end = new Date(item.endTime);
      return Math.round((end.getTime()-start.getTime())/60000);
    } else {
      return '';
    }
  }

  renderPipelines(pipelines: Pipeline[]) {
    return pipelines.map(e => e.id).join(",");
  }

}
