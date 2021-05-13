import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyInfoPage } from './family-info.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyInfoPageRoutingModule {}
