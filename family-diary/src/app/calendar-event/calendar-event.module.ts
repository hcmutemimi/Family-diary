import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarEventPageRoutingModule } from './calendar-event-routing.module';

import { CalendarEventPage } from './calendar-event.page';
import { HeaderModule } from '../@app-core/@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarEventPageRoutingModule,
    HeaderModule
  ],
  declarations: [CalendarEventPage]
})
export class CalendarEventPageModule {}
