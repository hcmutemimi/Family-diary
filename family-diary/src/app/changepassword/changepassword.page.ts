import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';
import { AccountService, AuthService } from '../@app-core/@http-config';
import { IDataNoti, PageNotiService } from '../@app-core/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  formSubmit: FormGroup;
  check = false;
  message = '';
  checkpn = false;
  messagepn = '';
  count: any;
  constructor(private formBuilder: FormBuilder,
    private pageNotiService: PageNotiService,
    private router: Router,
    private loadService: LoadingService,
    private passwordModal: ModalController,
    private accountService: AccountService,
    private toastService: ToastService
    ) {
    this.formSubmit = this.formBuilder.group({
      passwordcurrent: new FormControl('', Validators.required),
      passwordnew: new FormControl('', Validators.required),
      passwordconfirm: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }
  async openModal(ev: any) {
    const popover = await this.passwordModal.create({
      component: ChangepasswordPage,
      cssClass: 'modalPassword',
    });
    return await popover.present();
  }
  dismissModal() {
    this.passwordModal.dismiss();
  }
  onSubmit() {
    const cp = this.formSubmit.value.passwordcurrent;
    const pn = this.formSubmit.value.passwordnew;
    const pc = this.formSubmit.value.passwordconfirm;
    if (pn.length < 6) {
      this.checkpn = true;
      this.messagepn = 'Min length password is 6.'
    }
    else if (pn != pc) {
      this.check = true;
      this.checkpn = false;
      this.message = 'Password does not match !'
    }
    else {
      this.check = false;
      const datapasing: IDataNoti = {
        title: 'SUCCESSFUL!',
        des: 'Change Password Successfully!',
        routerLink: '/home'
      }
      var ps = {
        "currentPassword": cp,
        "newPassword": pn,
      }
      this.dismissModal()
      this.loadService.present()
      this.accountService.updatePassword(ps).subscribe(data => {
        this.loadService.dismiss();
        this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigateByUrl('/page-noti');
      },
      (error)=>{
        this.toastService.present(error.message)
        throw error
      })
    }
  }
  async closeModalPassword() {
    this.passwordModal.dismiss();
  }
}
