import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPageRoutingModule } from './activity-detail-routing.module';

import { ActivityDetailPage } from './activity-detail.page';
import { HeaderModule } from '../@app-core/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityDetailPageRoutingModule,
    HeaderModule
  ],
  declarations: [ActivityDetailPage]
})
export class ActivityDetailPageModule {}
