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
export class FamilyMemberService {
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
  public getListFamily(params) {
    return this.http.get(`${APICONFIG.FAMILY_MEMEBER.GET}?${(requestQuery(params))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public removeUser(id, request) {
    return this.http.post(`${APICONFIG.FAMILY_MEMEBER.REMOVE_USER(id)}`, request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  } 
  public addMember(request) {
    return this.http.post(`${APICONFIG.FAMILY_MEMEBER.ADD_MEMBER}`, request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  } 
  public getList() {
    return this.http.get(`${APICONFIG.FAMILY_MEMEBER.GET_LIST}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  } 

}
