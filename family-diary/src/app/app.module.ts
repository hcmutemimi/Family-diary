import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AccountService } from './@app-core/@http-config/account';
import { AuthService } from './@app-core/@http-config/auth';
import { StorageService } from './@app-core/storage.service';
import { CoreModule } from './@app-core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  AuthService,
  StorageService,
  AccountService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
