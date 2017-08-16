import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule
  ]
})

export class SharedModule {}
