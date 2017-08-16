import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {NotebookPageComponent} from '../notebook-page/notebook-page.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    NotebookPageComponent
  ],
  providers: []
})
export class HomeModule {}
