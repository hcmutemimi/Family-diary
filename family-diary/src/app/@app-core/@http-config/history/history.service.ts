import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { APICONFIG } from '../api.service'
import { requestQuery } from '../../utils'
@Injectable()
export class HistoryService {
  constructor(
    private http: HttpClient,
  ) { }

  public getAll(query) {
    return this.http.get(`${APICONFIG.HISTORY.GET}?${(requestQuery(query))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }


}
