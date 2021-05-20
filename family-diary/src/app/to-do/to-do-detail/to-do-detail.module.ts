import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToDoDetailPageRoutingModule } from './to-do-detail-routing.module';

import { ToDoDetailPage } from './to-do-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToDoDetailPageRoutingModule
  ],
  declarations: [ToDoDetailPage]
})
export class ToDoDetailPageModule {}
