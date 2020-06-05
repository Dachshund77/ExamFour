import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactBarComponent } from './components/contact-bar/contact-bar.component';
import { StandardContentContainerComponent } from './components/standard-content-container/standard-content-container.component';

//I think this need to be yeeted at some point
@NgModule({
  declarations: [
    ContactBarComponent,
    StandardContentContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ContactBarComponent, StandardContentContainerComponent]
})
export class SharedModule { }
