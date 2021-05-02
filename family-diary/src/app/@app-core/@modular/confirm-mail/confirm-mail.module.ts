import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmMailPageRoutingModule } from './confirm-mail-routing.module';

import { ConfirmMailPage } from './confirm-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmMailPageRoutingModule
  ],
  declarations: [ConfirmMailPage]
})
export class ConfirmMailPageModule {}
