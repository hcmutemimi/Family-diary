import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListItemPageRoutingModule } from './list-item-routing.module';

import { ListItemPage } from './list-item.page';
import { HeaderModule } from '../@app-core/@modular/header/header.module';
import { HeaderAddModule } from '../@app-core/@modular/header-add/header-add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListItemPageRoutingModule,
    HeaderAddModule
  ],
  declarations: [ListItemPage]
})
export class ListItemPageModule {}
