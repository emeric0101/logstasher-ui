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
    url: string;
    type: string;
    body: string;
    method: string;
}

