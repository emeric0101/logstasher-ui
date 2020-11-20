import {EventEmitter, Injectable} from "@angular/core";
import { HttpService } from '../services/Http.service';
import { Batch } from './batch';
import { BatchArchive } from './batch-archive.class';

@Injectable({providedIn: 'root'})
export class BatchesService {
    readonly modelName = "batches";
    readonly instance = '_batch';

    public updated = new EventEmitter();

    constructor(
      private httpService: HttpService
    ) { }

      public async findAll() {
        const r = await this.httpService.get<any>(this.modelName);
        return r;
      }
      public save(p: Batch) {
        this.httpService.post(this.modelName, p);
      }
      public delete(p: Batch) {
        this.httpService.delete(this.modelName + '/' + p.id);
      }

      public findArchiveWeek() {
        return this.httpService.get<BatchArchive[]>(this.modelName + '/archive');
      }

}
