import { Injectable, EventEmitter } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class WebsocketService {

    client: Client;

    socketClose = new EventEmitter();

    subscriptions: StompSubscription[] = [];
    subscriptioncallBack = [];

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
                    resolve(null);
                },
                onWebSocketClose: (e) => {
                    this.client = null;
                    this.socketClose.emit();
                    console.log('socket closed', e);
                }
            });
            client.activate();
        });
    }
    /**
     * Reconnect and add previous subscription
     */
    async reconnect() {
        if (this.client != null) {
            return;
        }
        await this.connect();
        this.resetSubscription();
      }

    public resetSubscription() {
        for (const s of this.subscriptions) {
            s.unsubscribe();
        }
        // recreate subscription
        const sub: any[] = [...this.subscriptioncallBack];
        this.subscriptioncallBack = [];
        this.subscriptions = [];
        for (const s of sub) {
            this.subscribe(s.url, s.callback, s.header);
        }
    }

    public subscribe(url: string, callback, header = {}) {
        if (!this.client) {
            throw Error('Socket not connected');
        }
        this.subscriptioncallBack.push({url: url, callback: callback, header: header});
        this.subscriptions.push(this.client.subscribe(url, (r) => {
            const result = JSON.parse(r.body);
            callback(result);
        }, header));
    }


}
