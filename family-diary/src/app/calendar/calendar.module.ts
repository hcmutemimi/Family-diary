import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
// import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarPage } from './calendar.page';
import { HeaderModule } from '../@app-core/@modular/header/header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    // NgCalendarModule,
    CalendarPageRoutingModule,
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
