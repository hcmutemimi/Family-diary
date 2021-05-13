import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../api.service';
import { catchError, map } from 'rxjs/operators';
import { IPageCalendar } from './calender.DTO';
import { requestQuery } from '../../utils';


@Injectable()
export class CalendarService {

  constructor(
    private http: HttpClient,
    // private storage: StorageService,
    // private toastr: ToastrService,
  ) { }

  public getByMonth(request: IPageCalendar) {
    return this.http.get<any>(`${APICONFIG.CALENDARS.GET_BY_MONTH}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getByWeek(cal_date) {
    return this.http.get<any>(`${APICONFIG.CALENDARS.GET_BY_WEEK}?cal_date=${cal_date}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getByday(request: IPageCalendar) {
    return this.http.get<IPageCalendar>(`${APICONFIG.CALENDARS.GET_BY_DAY}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

}
