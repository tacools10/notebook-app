import { BrowserModule } from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {FooterComponent} from './shared/layout/footer.component';
import {HeaderComponent} from './shared/layout/header.component';
import {NotebookPageModule} from './notebook-page/notebook-page.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './home/home.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from '@ngrx/store';
import {reducer} from './common/reducers/index';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent, FooterComponent, HeaderComponent
  ],
  imports: [
    BrowserModule,
    NotebookPageModule,
    ReactiveFormsModule,
    rootRouting,
    SharedModule,
    HomeModule,
    NgbModule.forRoot(),
    StoreModule.provideStore(reducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
