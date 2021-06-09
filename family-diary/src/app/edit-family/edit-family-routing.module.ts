import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFamilyPage } from './edit-family.page';

const routes: Routes = [
  {
    path: '',
    component: EditFamilyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFamilyPageRoutingModule {}
