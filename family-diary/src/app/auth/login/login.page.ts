import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PATTERN } from '../../@app-core/@http-config/pattern.service';
import { LoadingService } from '../../@app-core/utils/loading.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../@app-core/utils/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // public type = 'password';
  // public showpass = false;
  // public name = 'eye-outline';
  // public status = 'login';

  country_codes: any;
  segmentValue = 'login';
  matchPassword = false;
  formLogin: FormGroup;
  formSignUp: FormGroup;

  validationLoginMessages = {
    email: [
      { type: 'required', message: 'Vui lòng nhập email của bạn.' },
    ],
    password: [
      { type: 'required', message: 'Vui lòng nhập mật khẩu.' }
    ],
  }

  validationSignUpMessages = {
    full_name: [
      { type: 'required', message: 'Tên không được để trống' },
      { type: 'pattern', message: "Tên không chứa ký tự đặc biệt" },
    ],
    email: [
      { type: 'required', message: 'Email không được trống' },
      { type: 'pattern', message: 'Email không hợp lệ' },
    ],
    phone_number: [
      { type: 'required', message: 'Số điện toại không được dderr trống' },
      { type: 'pattern', message: 'Số điện thoại không hợp lệ' },
    ],
    password: [
      { type: 'required', message: 'Mật khẩu không được để trống' },
      { type: 'minLength', message: 'Mật khẩu ít nhất 6 ký tự' },
    ],
  }

  countries: any;
  constructor(
    private router: Router,
    // private authService: AuthService,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    // private accountService: AccountService,
    private loadingService: LoadingService
  ) { }
  ngOnInit() {
    
    this.initForm();
  }
   
  initForm() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    this.formSignUp = this.formBuilder.group({
      full_name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
      phone_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      confirmed_password: new FormControl('')
    })
  }

  changedSegment(event) {
    this.segmentValue = event.target.value;
  }

  canSubmitLogin() {
    return this.formLogin.valid;
  }

  canSubmitSignUp() {
    return this.formSignUp.valid;
  }
  submitLogin() {
    if (!this.canSubmitLogin()) {
      this.markFormGroupTouched(this.formLogin);
    } else {
      // this.authService.login(this.formLogin.value).subscribe(() => {
      //   this.setLocalStore()
      //   this.router.navigate(['main/chabad']);
      // });
    }
  }
  setLocalStore() {
    // this.accountService.getAccounts().subscribe(result => {
    //   localStorage.setItem('email',result.app_user.email) 
    //   if(result.app_user.avatar == null) {
    //     localStorage.setItem('avatar', "https://i.imgur.com/edwXSJa.png");
    //   }
    //   else {
    //     localStorage.setItem('avatar', result.app_user.avatar);
    //   }
    // });
  }

  submitSignUp() {
    if (!this.canSubmitSignUp()) {
      this.markFormGroupTouched(this.formSignUp);
    } else if (!this.checkMatchConfirmedPassword()) {
      this.toastService.present('Confirmed password not match');
    } else {
      let data = this.formSignUp.value;
      data.phone_number = data.phone_number.length == 10 ? data.phone_number.substring(1, 10) : data.phone_number;
      data.phone_number = `+${this.formSignUp.value.country_code}${data.phone_number}`;
      // this.authService.signup(this.formSignUp.value).subscribe();
    }
  }

  // showPass() {
  //   this.showpass = !this.showpass;
  //   if (this.showpass) {
  //     this.type = 'text';
  //     this.name = 'eye-off-outline'
  //   }
  //   else {
  //     this.type = 'password';
  //     this.name = 'eye-outline'
  //   }
  // }

  clickForgotPassword() {
    this.router.navigate(['auth-manager/forgot-password']);
  }

  checkMatchConfirmedPassword() {
    return this.formSignUp.get('password').value == this.formSignUp.get('confirmed_password').value;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
