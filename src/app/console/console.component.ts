import { Component, OnInit, OnDestroy } from '@angular/core';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { ConsoleService } from './console.service';
import { Running } from './running.class';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
  providers: [TerminalService]
})
export class ConsoleComponent implements OnInit, OnDestroy {
  buffer: string[];
  running: Running;
  timer;

  showConsole = false;

  socketError = false;

  constructor(
    private terminalService: TerminalService,
    private consoleService: ConsoleService,
    private webSocketService: WebsocketService
  ) { }

  async reconnect() {
    this.webSocketService.reconnect();
    this.socketError = false;
  }

  async ngOnInit() {
    this.running = await this.consoleService.getRunning();

    this.webSocketService.socketClose.subscribe(() => {
      this.socketError = true;
    })



    await this.webSocketService.connect();


    this.webSocketService.subscribe('/state', (r) => {
      this.socketError = false;
      this.consoleService.current = r;
      this.running = r;
      this.buffer = this.consoleService.getBuffer();
    })
  }

  async stop() {
    await this.consoleService.stop();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }


  async restart() {
    await this.consoleService.restartLogstash();
  }

  restartBatches() {
    this.consoleService.restartBatches();
  }

  /**
   * Remove all info msg not needed here
   * @param buffer
   */
  filterBuffer(buffer: string[]) {
    if (!buffer) {
      return '';
    }
    return buffer.filter(e => !e.includes("[INFO ]"));
  }
}
