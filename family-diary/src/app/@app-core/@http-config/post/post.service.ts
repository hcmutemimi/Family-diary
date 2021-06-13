import { Injectable, Query } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { requestQuery } from '../../utils'
import { APICONFIG } from '../api.service'

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient,
  ) { }

  public uploadPhoto(req) {
    return this.http.post('http://image-service.patitek.com/api/v1/images/upload', req).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    )
  }
  public getImage(params) {
    return this.http.get(`${APICONFIG.POST.GET}?${(requestQuery(params))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public saveImage(req) {
    return this.http.post(`${APICONFIG.POST.SAVE}`, req).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    )
  }

  
}
