import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pipeline } from '../Pipeline';
import { PipelineService } from '../pipeline.service';

@Component({
  selector: 'app-pipline-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Output() updated = new EventEmitter();
  pipeline : Pipeline = {
      id: "",
      content: "",
      activated: false
  };

  constructor(
    private pipelineService: PipelineService
  ) { }

  ngOnInit() {
  }

  async submit() {
    if (this.pipeline.id == "" || this.pipeline.content == null) {
      return;
    }
    await this.pipelineService.save(this.pipeline);
    setTimeout(() => this.updated.emit(), 1000);
  }

  uploadHandler($event) {
    if ($event.files && $event.files.length > 0) {
      var reader = new FileReader();
      reader.onload = (result) => {
        this.pipeline.content = reader.result as string;
      }
      reader.readAsText($event.files[0]);
    }
  }
  fixId() {
    this.pipeline.id = this.pipeline.id.split('/').join('');
  }

}
