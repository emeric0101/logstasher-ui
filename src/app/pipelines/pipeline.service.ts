import { Injectable } from '@angular/core';
import { HttpService } from '../services/Http.service';
import { Pipeline } from './pipeline';
import {ExecutorEnum} from "../batches/batch";

@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  readonly modelName = "pipeline";
  readonly instance = ExecutorEnum.LOGSTASH_PIPELINE;
constructor(
  private httpService: HttpService
) { }

  public async findAll() {
    const r = await this.httpService.get<any>(this.modelName);
    return r.content;
  }
  public save(p: Pipeline) {
    this.httpService.post(this.modelName, p);
  }
  public delete(p: Pipeline) {
    this.httpService.delete(this.modelName + '/' + p.id);
  }

}
