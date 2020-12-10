import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NxExpertModule } from '@aposin/ng-aquila/config';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxGridModule } from '@aposin/ng-aquila/grid';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NxExpertModule,
    NxInputModule,
    NxGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
