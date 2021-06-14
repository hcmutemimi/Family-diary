import { GeolocationService } from 'src/app/@app-core/utils';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, API_URL, AuthService, EventService, FamilyMemberService, FamilyService, StorageService } from './@http-config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandlerService } from './global-error-handler.service'
import { IntercepterService } from './http-interceptor';
import { HistoryService } from './@http-config/history';
import { CameraService } from './utils/camera.service';
import { PostService } from './@http-config/post';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, 

  ],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: API_URL, useValue: environment.apiUrl
        },
        {provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true},
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
        AuthService,
        StorageService,
        AccountService,
        FamilyService,
        FamilyMemberService,
        EventService,
        HistoryService,
        CameraService,
        PostService,
        GeolocationService
      ]
    }
  }
 }
