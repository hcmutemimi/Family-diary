import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToDoDetailPageRoutingModule } from './to-do-detail-routing.module';
import { ToDoDetailPage } from './to-do-detail.page';
import { HeaderAddModule } from 'src/app/@app-core/@modular/header-add/header-add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ToDoDetailPageRoutingModule,
    HeaderAddModule

  ],
  declarations: [ToDoDetailPage]
})
export class ToDoDetailPageModule {}
