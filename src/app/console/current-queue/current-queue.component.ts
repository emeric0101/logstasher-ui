import {Component, OnDestroy, OnInit} from '@angular/core';
import { ExecutionBatch, ExecutionQueue } from '../execution-queue.class';
import {LogstasherEvent, LogstasherService, LogstashInstance} from '../logstasher.service';
import {Pipeline} from "../../pipelines/pipeline";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-current-queue',
  templateUrl: './current-queue.component.html',
  styleUrls: ['./current-queue.component.scss']
})
export class CurrentQueueComponent implements OnInit, OnDestroy {
  displayTerminal: LogstashInstance = null;
  instances: LogstashInstance[];
  sub: Subscription;
  constructor(
    private consoleService: LogstasherService
  ) { }

  async ngOnInit() {
    const instances = await this.consoleService.loadInstances();
    this.setInstances(instances);
    this.sub = this.consoleService.logstasherEvent.subscribe((event: LogstasherEvent) => {
      if (event.error) {
        return;
      }
      const e = event.instance;
      console.log(e);
      const instances = this.instances.filter(p => p.instance != e.instance);
      instances.push(e);
      this.setInstances(instances);
    });
  }

  setInstances(instances: LogstashInstance[]) {
    this.instances = instances.filter(e => e.state != 'STOPPED' && e.state != 'DONE');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showConsole(batch: LogstashInstance) {
    this.displayTerminal = batch;
  }

  renderPipelines(pipelines: Pipeline[]) {
    return pipelines.map(e => e.id).join(",");
  }

  stop(instance: LogstashInstance) {
    if (instance.instance == '_batch') {
      this.consoleService.stopBatch(instance.instance);
    } else {
      this.consoleService.stopPipeline();
    }

  }
}
