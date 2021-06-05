import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { requestQuery } from '../../utils'
import { APICONFIG } from '../api.service'

@Injectable()
export class FamilyMemberService {

  constructor(
    private http: HttpClient,
  ) { }


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
  public historyStatus(query) {
    return this.http.get(`${APICONFIG.FAMILY_MEMEBER.GET_HISTORY_STATUS}?${(requestQuery(query))}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  } 
  public updateHistory(id) {
    return this.http.post(`${APICONFIG.FAMILY_MEMEBER.UPDATE_HISTORY_STATUS}`, id).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => { 
        throw errorRes.error; }));
  } 
}
