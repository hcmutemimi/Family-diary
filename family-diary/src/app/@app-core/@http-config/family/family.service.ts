import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { requestQuery } from '../../utils'
import { APICONFIG } from '../api.service'

@Injectable()
export class FamilyService {

  constructor(
    private http: HttpClient,
  ) { }

  public getListFamily() {
    return this.http.get(`${APICONFIG.FAMILY.GET}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public createFamily(request) {
    return this.http.post(`${APICONFIG.FAMILY.CREATE}`, request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public deleteFamily(id) {
    return this.http.delete(`${APICONFIG.FAMILY.DELETE(id)}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public checkHost(query) {
    return this.http.get(`${APICONFIG.FAMILY.CHECK_HOST}?${(requestQuery(query))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
}
