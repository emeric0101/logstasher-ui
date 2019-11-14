import { Injectable } from '@angular/core';
import { HttpService } from '../services/Http.service';
import { Running } from './running.class';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  current: Running;
constructor(
  private httpService: HttpService
) { }

restartLogstash() {
  this.httpService.get("logstash/restart");
}
restartBatches() {
  this.httpService.get("batches/restartBatches");
}

async getRunning() {
  this.current = await this.httpService.get<Running>("logstash/running");
  return this.current;
}

getIsBusy() {
  if (!this.current) { return true;}
  return this.current.state != 'STOPPED' && this.current.state != 'ERROR' && this.current.state != 'DONE';
}

stop() {
  return this.httpService.get('logstash/stop');
}
getBuffer(): string[] {
  if (!this.current) {
    return [];
  }
  return this.current.buffer;
}

getCurrentQueue() {
  if (!this.current) {
    return null;
  }
  return this.current.queue;
}


}
