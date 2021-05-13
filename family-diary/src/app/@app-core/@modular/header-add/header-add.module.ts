import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAddComponent } from './header-add.component';



@NgModule({
  declarations: [HeaderAddComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderAddComponent
  ]
})
export class HeaderAddModule { }
