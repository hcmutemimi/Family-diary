import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AuthService } from './@app-core/@http-config/auth';
import { StorageService } from './@app-core/storage.service';
import { CoreModule } from './@app-core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './@app-core/auth-guard.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { FCM } from '@ionic-native/fcm';
// import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    StorageService,
    AuthGuardService,
    Camera,
    SplashScreen,
    StatusBar,
    // FCM,
    //   { 
    //     provide: RouteReuseStrategy, 
    //     useClass: IonicRouteStrategy 
    //   }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
