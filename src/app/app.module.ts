import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PipelinesComponent } from './pipelines/pipelines.component';

import {InputTextModule} from 'primeng/inputtext';
import { HttpService } from './services/Http.service';
import { PipelineService } from './pipelines/pipeline.service';
import { CreateComponent } from './pipelines/create/create.component';
import { FormsModule }   from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';
import {TerminalModule} from 'primeng/terminal';
import { ConsoleComponent } from './console/console.component';
import {DialogModule} from 'primeng/dialog';
import { EditComponent } from './pipelines/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
   declarations: [
      AppComponent,
      PipelinesComponent,
      CreateComponent,
      ConsoleComponent,
      EditComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      InputTextModule,
      ButtonModule,
      FileUploadModule,
      HttpClientModule,
      TableModule,
      CheckboxModule,
      CardModule,
      TerminalModule,
      DialogModule,
      BrowserAnimationsModule
   ],
   providers: [
      HttpService,
      PipelineService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
