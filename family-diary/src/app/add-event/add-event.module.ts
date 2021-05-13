import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEventPageRoutingModule } from './add-event-routing.module';

import { AddEventPage } from './add-event.page';
import { HeaderAddModule } from '../@app-core/@modular/header-add/header-add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HeaderAddModule,
    AddEventPageRoutingModule
  ],
  declarations: [AddEventPage]
})
export class AddEventPageModule {}
