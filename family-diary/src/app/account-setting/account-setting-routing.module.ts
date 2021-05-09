import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSettingPage } from './account-setting.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingPage
  },  {
    path: 'family',
    loadChildren: () => import('./family/family.module').then( m => m.FamilyPageModule)
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingPageRoutingModule {}
