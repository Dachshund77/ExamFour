import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactBarComponent } from './components/contact-bar/contact-bar.component';

//I think this need to be yeeted at some point
@NgModule({
  declarations: [
    ContactBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ContactBarComponent]
})
export class SharedModule { }
