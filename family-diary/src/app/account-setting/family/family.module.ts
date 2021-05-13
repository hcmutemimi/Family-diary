import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyPageRoutingModule } from './family-routing.module';

import { FamilyPage } from './family.page';
import { HeaderModule } from 'src/app/@app-core/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyPageRoutingModule,
    HeaderModule
  ],
  declarations: [FamilyPage]
})
export class FamilyPageModule {}
