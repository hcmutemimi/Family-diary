import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyInfoPageRoutingModule } from './family-info-routing.module';

import { FamilyInfoPage } from './family-info.page';
import { HeaderModule } from 'src/app/@app-core/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HeaderModule,
    FamilyInfoPageRoutingModule
  ],
  declarations: [FamilyInfoPage]
})
export class FamilyInfoPageModule {}
