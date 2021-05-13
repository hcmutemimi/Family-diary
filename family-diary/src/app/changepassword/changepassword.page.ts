import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';
import { IDataNoti, PageNotiService } from '../@app-core/@http-config/page-noti/page-noti.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private pageNotiService: PageNotiService,
    private router: Router,
    private loadService: LoadingService,
    private passwordModal: ModalController,
    // private authService: AuthService
  ) {
    this.formSubmit = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
  }
  dismissModal() {
    this.passwordModal.dismiss();
  }
  onSubmit() {
    const name = this.formSubmit.value.name;
    const email = this.formSubmit.value.email;

    // this.check = false;
    const datapasing: IDataNoti = {
      title: 'SUCCESSFUL!',
      des: 'Send email successful!',
      routerLink: '/account-setting/family/family-info'
    }
    var params = {
      email: email,
      name: name,
    }
    this.dismissModal()
    this.loadService.present()
    this.pageNotiService.setdataStatusNoti(datapasing);
    this.router.navigateByUrl('/page-noti');
    this.loadService.dismiss();


  }

}
