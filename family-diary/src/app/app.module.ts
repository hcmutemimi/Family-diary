import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AccountService } from './@app-core/@http-config/account';
import { AuthService } from './@app-core/@http-config/auth';
import { StorageService } from './@app-core/storage.service';
import { CoreModule } from './@app-core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './@app-core/auth-guard.service';
// import { NgCalendarModule  } from 'ionic2-calendar';
// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
// ]);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    // NgCalendarModule,
    CoreModule.forRoot(),
    // FullCalendarModule 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  AuthService,
  StorageService,
  AccountService,
  AuthGuardService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
