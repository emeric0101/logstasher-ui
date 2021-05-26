import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  @Input() lines: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
