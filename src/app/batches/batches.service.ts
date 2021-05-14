import {EventEmitter, Injectable} from "@angular/core";
import { HttpService } from '../services/Http.service';
import {Batch, ExecutorEnum} from './batch';
import { ExecutionArchive } from './batch-archive.class';

@Injectable({providedIn: 'root'})
export class BatchesService {
    readonly modelName = "batches";

    public updated = new EventEmitter();

    constructor(
      private httpService: HttpService
    ) { }

      public async findAll(executor: ExecutorEnum) {
        const r = await this.httpService.get<Batch[]>(this.modelName);
        // fix me, put the filter into the api
        return r.filter(e => e.executor == executor);
      }
      public save(p: Batch) {
        this.httpService.post(this.modelName, p);
      }
      public delete(p: Batch) {
        this.httpService.delete(this.modelName + '/' + p.id);
      }



}
