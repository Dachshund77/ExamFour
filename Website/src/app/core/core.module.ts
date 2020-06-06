import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MenuBarComponent } from './header/menu-bar/menu-bar.component';


@NgModule({
  declarations: [
    MenuBarComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    MenuBarComponent
  ]
})
export class CoreModule { }
