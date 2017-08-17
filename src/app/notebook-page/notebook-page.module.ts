import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {NotebookPageComponent} from './notebook-page.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const notebookPageRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'pages/:id',
    component: NotebookPageComponent
  },

]);

@NgModule({
  imports: [
    notebookPageRouting,
    SharedModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [],

  providers: []
})
export class NotebookPageModule {}
