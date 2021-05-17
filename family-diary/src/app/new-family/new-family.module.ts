import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewFamilyPageRoutingModule } from './new-family-routing.module';

import { NewFamilyPage } from './new-family.page';
import { HeaderAddModule } from '../@app-core/@modular/header-add/header-add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewFamilyPageRoutingModule,
    HeaderAddModule,
    ReactiveFormsModule,
  ],
  declarations: [NewFamilyPage]
})
export class NewFamilyPageModule {}
