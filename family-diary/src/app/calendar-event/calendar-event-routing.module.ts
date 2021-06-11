import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarEventPage } from './calendar-event.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarEventPageRoutingModule {}
