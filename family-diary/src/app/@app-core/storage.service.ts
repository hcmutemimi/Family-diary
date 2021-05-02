import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './@http-config/account';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private userSub: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  constructor(private accountService: AccountService) { }
  public clear() {
    this.userSub.next(null)
  }
  public setInfoAccount() {
    if(localStorage.getItem('Authorization')) {
      return this.accountService.getAccount().subscribe((data: any) =>{
        this.userSub.next(data)
      })
    }
  }
}
