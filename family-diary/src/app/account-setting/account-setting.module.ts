import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { AccountSettingPageRoutingModule } from './account-setting-routing.module'

import { AccountSettingPage } from './account-setting.page'
import { HeaderModule } from '../@app-core/@modular/header/header.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AccountSettingPageRoutingModule,
    HeaderModule,
  ],
  declarations: [AccountSettingPage]
})
export class AccountSettingPageModule {}
