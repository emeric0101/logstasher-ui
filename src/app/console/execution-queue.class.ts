import { Batch } from '../batches/batch';

export class ExecutionQueue {
    queue: ExecutionBatch[];
}

export class ExecutionBatch {
    batch: Batch;
    state: string;
    output: string[];
}