import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { requestQuery } from '../../utils'
import { APICONFIG } from '../api.service'

@Injectable()
export class EventService {

  constructor(
    private http: HttpClient,
  ) { }
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
  public updateMetaDataEvent(id, request) {
    return this.http.post(`${APICONFIG.EVENT.UPDATE_META_DATA(id)}`, request).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public getEventStatus(params) {
    return this.http.get(`${APICONFIG.EVENT.GET_BY_STATUS}?${(requestQuery(params))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public getAllEventByUser(params) {
    return this.http.get(`${APICONFIG.EVENT.GET_ALL_BY_USER}?${(requestQuery(params))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public getEventCreateByUser(params) {
    return this.http.get(`${APICONFIG.EVENT.GET_EVENT_USER_CREATE}?${(requestQuery(params))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public getEventByMonth(params) {
    return this.http.get(`${APICONFIG.EVENT.GET_BY_MONTH}?${(requestQuery(params))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  }
  public getEventFamily(params) {
    return this.http.get(`${APICONFIG.EVENT.GET_EVENT_FAMILY}?${(requestQuery(params))}`,).pipe(
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
