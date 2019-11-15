export class Batch {
    id: string;
    lastTime: string;
    activated: boolean;
    content: string;
    order: number;
    startHour: number;
    startMinute: number;
    timeout: number;
    entyRequests: RestRequest[];
}

export class RestRequest {
    private url: string;
    private type: string;
    private body: string;
}