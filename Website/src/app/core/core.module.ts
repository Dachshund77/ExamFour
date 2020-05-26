import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuBarComponent } from './header/menu-bar/menu-bar.component';


@NgModule({
  declarations: [
    MenuBarComponent],
  imports: [
    CommonModule
  ],
  exports:[
    MenuBarComponent
  ]
})
export class CoreModule { }
