import { Injectable } from '@angular/core';
import { HttpService } from '../services/Http.service';
import { Running } from './running.class';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

constructor(
  private httpService: HttpService
) { }

refresh() {
  return this.httpService.get<string[]>("logstash/console");
}
restartLogstash() {
  this.httpService.get("logstash/restart");
}

getRunning() {
  return this.httpService.get<Running>("logstash/running");
}

stop() {
  return this.httpService.get('logstash/stop');
}

}
