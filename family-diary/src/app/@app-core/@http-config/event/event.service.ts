import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { StorageService } from 'src/app/@app-core/storage.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { LoadingService, ToastService, requestQuery } from '../../utils'
import { APICONFIG } from '../api.service'
// import { AccountService } from '../account'

@Injectable()
export class EventService {
  private data: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    // private accountService: AccountService
  ) { }

  public get receiveData(): Observable<any> {
    return this.data.asObservable()
  }
  public sendData(value: any) {
    this.data.next(value)
  }
  public createEvent(request) {
    return this.http.post(`${APICONFIG.EVENT.CREATE}`, request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public updateStatusEvent(id, request) {
    return this.http.post(`${APICONFIG.EVENT.UPDATE_STATUS(id)}`, request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public getEvent(params) {
    return this.http.get(`${APICONFIG.EVENT.GET}?${(requestQuery(params))}`,).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public deleteEvent(id: string) {
    return this.http.delete<any>(`${APICONFIG.EVENT.DELETE(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
  public getEventId(id: string) {
    return this.http.get<any>(`${APICONFIG.EVENT.GET_BY_ID(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
  public update(id, request) {
    return this.http.post<any>(`${APICONFIG.EVENT.UPDATE(id)}`, request).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }


}
