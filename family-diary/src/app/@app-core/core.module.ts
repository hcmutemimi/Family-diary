import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, API_URL, AuthService, CalendarService, EventService, FamilyMemberService, FamilyService, StorageService } from './@http-config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandlerService } from './global-error-handler.service'
import { IntercepterService } from './http-interceptor';
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
        {provide: HTTP_INTERCEPTORS,useClass: IntercepterService, multi: true},
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
        AuthService,
        StorageService,
        AccountService,
        FamilyService,
        FamilyMemberService,
        CalendarService,
        EventService
      ]
    }
  }
 }
