import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyPage } from './family.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyPage
  },
  {
    path: 'family-info',
    loadChildren: () => import('./family-info/family-info.module').then( m => m.FamilyInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyPageRoutingModule {}
