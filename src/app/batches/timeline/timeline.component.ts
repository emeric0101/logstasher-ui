import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Batch} from "../batch";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnChanges {

  @Input() batches: Batch[];
  events;
  constructor() { }

  ngOnChanges() {
    const events = this.batches.map(e => ({...e})).filter(e => e.activated);
    events.sort((a: Batch, b: Batch) => (a.startHour *60+a.startMinute) - (b.startHour *60+b.startMinute));
    this.events = events;
  }

}
