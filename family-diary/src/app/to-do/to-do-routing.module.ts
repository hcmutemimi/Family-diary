import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToDoPage } from './to-do.page';

const routes: Routes = [
  {
    path: '',
    component: ToDoPage
  },
  {
    path: 'to-do-detail',
    loadChildren: () => import('./to-do-detail/to-do-detail.module').then( m => m.ToDoDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoPageRoutingModule {}
