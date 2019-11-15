import { Batch } from './batch';

export class BatchArchive {
    id: string;
    batch: Batch;
    startTime: Date;
    endTime: Date;
    state: string;
}