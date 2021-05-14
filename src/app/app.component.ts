import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {LogstasherService} from "./console/logstasher.service";
import {ExecutorEnum} from "./batches/batch";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'logstasher';

  ExecutorEnum = ExecutorEnum;

  public constructor(private primengConfig: PrimeNGConfig,
                     private logstasherService: LogstasherService) {

  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.logstasherService.init();
  }


}
