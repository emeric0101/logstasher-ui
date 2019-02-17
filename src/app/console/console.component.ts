import { Component, OnInit, OnDestroy } from '@angular/core';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { ConsoleService } from './console.service';
import { Running } from './running.class';

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
  constructor(
    private terminalService: TerminalService,
    private consoleService: ConsoleService
  ) { }

  ngOnInit() {

    this.timer = setInterval(async () => {
      try {
        this.running = await this.consoleService.getRunning();
        this.refresh();
      }
      catch (e) {
        console.log(e)
      }
    }, 800);
  }

  async stop() {
    await this.consoleService.stop();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  async refresh() {
    this.buffer = await this.consoleService.refresh();
  }
  async restart() {
    await this.consoleService.restartLogstash();
  }

}
