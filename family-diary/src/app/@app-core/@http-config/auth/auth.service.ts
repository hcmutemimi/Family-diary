import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { StorageService } from 'src/app/@app-core/storage.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { requestQuery } from '../../utils'
import { APICONFIG } from '../api.service'

@Injectable()
export class AuthService {
  private data: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) { }

  public get receiveData(): Observable<any> {
    return this.data.asObservable()
  }
  public sendData(value: any) {
    this.data.next(value)
  }
  public sendCode(req) {
    return this.http.post(`${APICONFIG.AUTH.SEND_CODE}`, req).pipe(
      map((result: any) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      }))
  }
  public checkCode(req) {
    return this.http.post(`${APICONFIG.AUTH.CHECK_CODE_RESET}`, req).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      }
      ))
  }
  public activeAccount(req) {
    return this.http.post(`${APICONFIG.AUTH.ACTIVE_ACCOUNT}`, req).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      }
      ))
  }
  public newPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD}`, req).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      }
      ))
  }
  logout() {
    localStorage.clear();
    this.storage.clear();
    this.storage.setInfoAccount();
    window.location.assign('/');
  }
  public signin(req) {
    return this.http.post(`${APICONFIG.AUTH.SIGNIN}`, req).pipe(
      map((result: any) => {
        this.storage.clear()
        localStorage.setItem('authorization', result.token)
        this.storage.setInfoAccount()
        return result
      }),
      catchError((errorRes: any) => {
        localStorage.clear()
        this.storage.clear()
        throw errorRes.error
      })
    )
  }

  public signup(req) {
    return this.http.post(`${APICONFIG.AUTH.SIGNUP}`, req).pipe(
      map((result: any) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      }))
  }


  checkLogin() {
    const token = localStorage.getItem('authorization')
    if (!token) {
      return false
    } else {
      return true
    }
  }
  private setLocalStore(data) {
    localStorage.setItem('authorization', data.token)
    localStorage.setItem('fullname', data.fullname)
    localStorage.setItem('exp', data.exp)
  }
}
