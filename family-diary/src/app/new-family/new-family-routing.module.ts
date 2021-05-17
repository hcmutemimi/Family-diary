import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFamilyPage } from './new-family.page';

const routes: Routes = [
  {
    path: '',
    component: NewFamilyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewFamilyPageRoutingModule {}
