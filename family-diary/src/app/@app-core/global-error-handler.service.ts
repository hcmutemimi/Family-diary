import { ErrorHandler, Injectable } from '@angular/core';
import { LoadingService, ToastService } from './utils';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private loadingService: LoadingService
  ) { }
  handleError(error: any): void {
    console.log(error)
    this.loadingService.dismiss()
  }
}
