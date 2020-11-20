import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {Batch, RecurrenceEnum} from "../batch";

@Component({
  selector: 'app-recurrence-setting',
  templateUrl: './recurrence-setting.component.html',
  styleUrls: ['./recurrence-setting.component.css']
})
export class RecurrenceSettingComponent implements OnInit {
  @Input() batch: Batch;
  @Output() batchChange = new EventEmitter<Batch>()

  recOptions = [
    {
      label: 'Daily',
      value: RecurrenceEnum.Daily
    },
    {
      label: 'Weekly',
      value: RecurrenceEnum.Weekly
    },
    {
      label: 'Monthly',
      value: RecurrenceEnum.Monthly
    },
  ];

  public RecurrenceEnum = RecurrenceEnum;
  public weekDaysOptions = RecurrenceSettingComponent.weekDaysOptions;
  public static weekDaysOptions = [
    {
      label: 'Monday',
      value: 2
    },
    {
      label: 'Tuesday',
      value: 3
    },
    {
      label: 'Wednesday',
      value: 4
    },
    {
      label: 'Thursday',
      value: 5
    },
    {
      label: 'Friday',
      value: 6
    },
    {
      label: 'Saturday',
      value: 7
    },
    {
      label: 'Sunday',
      value: 1
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.batchChange.emit(this.batch);
  }
}
