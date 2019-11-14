import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class WebsocketService {
    client: Client;

    public async connect(): Promise<any>
    {
        if (this.client) {
            return this.client;
        }
        return new Promise((resolve) => {
            const client = new Client({
                brokerURL: environment.wsUrl + '/logstasher',
                onConnect: (frame) => {
                    this.client = client;
                    resolve();
                },
                onWebSocketClose: (e) => {
                    console.log('socket closed', e);
                }
            });
            client.activate();
        });
    }

    public subscribe(url: string, callback, header = {}) {
        if (!this.client) {
            throw Error('Socket not connected');
        }
        return this.client.subscribe(url, (r) => {
            const result = JSON.parse(r.body);
            callback(result);
        }, header);
    }


}