import { Batch } from './batch';
import {Pipeline} from "../pipelines/pipeline";

export class ExecutionArchive {
    id: string;
    batch: Batch;
    pipeline: Pipeline[];
    startTime: Date;
    endTime: Date;
    state: string;
  logPath?: string;
}
