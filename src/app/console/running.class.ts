import { ExecutionQueue } from './execution-queue.class';

export class Running {
    state: string;
    queue: ExecutionQueue;
    buffer: string[];
}