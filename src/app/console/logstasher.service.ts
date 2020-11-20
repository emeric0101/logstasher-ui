import {Injectable} from '@angular/core';
import {HttpService} from '../services/Http.service';
import {Running} from './running.class';
import {WebsocketService} from "../services/websocket.service";
import { EventEmitter } from '@angular/core';
import {Batch} from "../batches/batch";
import {Pipeline} from "../pipelines/pipeline";
import {ExecutionArchive} from "../batches/batch-archive.class";

export class LogstasherEvent {

  constructor(public error: boolean, public instance: LogstashInstance) {
  }
}

export class LogstashInstance {
  state: string;
  instance: string;
  batch: ExecutionArchive;
  pipelines: Pipeline[];
  buffer: string[];
  started: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogstasherService {


  logstasherEvent = new EventEmitter<LogstasherEvent>()
  instances = new Map<string, LogstashInstance>();

  constructor(
    private httpService: HttpService,
    private webSocketService: WebsocketService
  ) {
    // set websocket
  }

  async init() {
    await this.webSocketService.connect();
    this.webSocketService.subscribe('/state', (r: LogstashInstance) => {
      const event = new LogstasherEvent(false, r);
      this.logstasherEvent.emit(event);
      this.instances.set(event.instance.instance, event.instance);
    });
    this.instances = new Map<string, LogstashInstance>();
    for (const instance of await this.loadInstances()) {
      this.instances.set(instance.instance, instance);
    }
  }


  getIsBusy(instance: string) {
    if (!this.instances.has(instance)) {
      return false;
    }
    const current = this.instances.get(instance);
    return current.state != 'STOPPED' && current.state != 'ERROR' && current.state != 'DONE';
  }

  startPipeline() {
    return this.httpService.get("pipeline/start");
  }
  startBatch(id: string) {
    return this.httpService.get("batches/start/" + id);
  }


  public async loadInstances() {
    return this.httpService.get<LogstashInstance[]>("logstash/all");
  }


  stopPipeline() {
    return this.httpService.get("pipeline/stop");
  }

  stopBatch(instance: string) {
    return this.httpService.get("batches/stop");
  }

  clearData(instance: string) {
    return this.httpService.get('logstash/clearData/' + instance);
  }
}
