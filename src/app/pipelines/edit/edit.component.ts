import { Component, OnInit, Input } from '@angular/core';
import { Pipeline } from '../pipeline';
import { PipelineService } from '../pipeline.service';

@Component({
  selector: 'app-pipeline-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() pipeline: Pipeline;
  constructor(
    private pipelineService: PipelineService,
  ) { }

  save() {
    this.pipelineService.save(this.pipeline);
  }

  ngOnInit() {
  }

}
