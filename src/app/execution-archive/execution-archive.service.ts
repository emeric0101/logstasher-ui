import { Injectable } from '@angular/core';
import {ExecutionArchive} from "../batches/batch-archive.class";
import {HttpService} from "../services/Http.service";

@Injectable({
  providedIn: 'root'
})
export class ExecutionArchiveService {
  modelName = 'executionArchive'
  constructor(
    private httpService: HttpService
  ) { }

  public findArchiveWeek() {
    return this.httpService.get<ExecutionArchive[]>(this.modelName + '/archive');
  }

  async getLog(id: string) {
    return this.httpService.get<{lines: string[]}>(this.modelName + '/' + id + "/log");
  }
}
