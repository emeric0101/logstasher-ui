import { Component, OnInit } from '@angular/core';
import { PipelineService } from './pipeline.service';
import { Pipeline } from './Pipeline';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.css']
})
export class PipelinesComponent implements OnInit {

  displayEdit = false;
  editPipeline: Pipeline;

  pipelines: Pipeline[];
  errorMsg = '';
  constructor(
    private pipelineService: PipelineService
  ) { }

  edit(va) {
    this.editPipeline = va;
    this.displayEdit = true;
  }

  async ngOnInit() {
    try {
      this.pipelines = await this.pipelineService.findAll();
    } catch (exception) {
      this.errorMsg = 'Unable to join server';
    }
  }
  async save(p: Pipeline) {
    await this.pipelineService.save(p);
    setTimeout(e => this.ngOnInit(), 1000);
  }
  async delete(p: Pipeline) {
    const c = confirm('Are you sure ?');
    if (!c) {
      return;
    }
    await this.pipelineService.delete(p);
    setTimeout(e => this.ngOnInit(), 1000);
  }

}
