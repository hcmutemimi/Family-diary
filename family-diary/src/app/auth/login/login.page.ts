import { GeolocationService } from 'src/app/@app-core/utils';
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AccountService, FamilyService, PATTERN } from '../../@app-core/@http-config'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { LoadingService, ModalService, ToastService } from '../../@app-core/utils'
import { AuthService } from '../../@app-core/@http-config/auth'
import { ConfirmMailPage } from 'src/app/@app-core/@modular/confirm-mail/confirm-mail.page'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type = 'password';
  public showpass = false;
  public name = 'eye-outline';
  // public status = 'login';

  country_codes: any
  segmentValue = 'login'
  matchPassword = false
  formLogin: FormGroup
  formSignUp: FormGroup
  public myDate = new Date().toISOString()
  validationLogin = {
    email: [
      { type: 'required', message: 'Enter your email.' },
    ],
    password: [
      { type: 'required', message: 'Enter your password.' }
    ],
  }

  validationSignUp = {
    fName: [
      { type: 'required', message: 'The field is not empty' },
      { type: 'pattern', message: "Doesn't contain special characters" },
    ],
    lName: [
      { type: 'required', message: 'The field is not empty' },
      { type: 'pattern', message: "Doesn't contain special characters" },
    ],
    email: [
      { type: 'required', message: 'The field is not empty' },
      { type: 'pattern', message: 'Email is Invalid' },
    ],
    phoneNumber: [
      { type: 'required', message: 'The field is not empty' },
      { type: 'pattern', message: 'Phone number is Invalid' }],
    password: [
      { type: 'required', message: 'The field is not empty' },
      { type: 'minLength', message: 'Password is not less than 6 characters' },
    ],
    birthday: [
      { type: 'required', message: 'The field is not empty' },
    ],
  }

  countries: any
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private modalService: ModalService,
    private familyService: FamilyService,
    private geolocationService: GeolocationService
  ) { }
  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    this.formSignUp = this.formBuilder.group({
      fName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      lName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      birthday: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      confirmed_password: new FormControl('')
    })
  }

  changedSegment(event) {
    this.segmentValue = event.target.value
  }
  showPassword() {
    this.showpass = !this.showpass
    if (this.showpass) {
      this.type = 'text'
      this.name = 'eye-off-outline'
    }
    else {
      this.type = 'password';
      this.name = 'eye-outline'
    }
  }
  canSubmitLogin() {
    return this.formLogin.valid
  }

  canSubmitSignUp() {
    return this.formSignUp.valid
  }
  submitLogin() {
    this.loadingService.present()
    if (!this.canSubmitLogin()) {
      this.markFormGroupTouched(this.formLogin)
      this.loadingService.dismiss()
    } else {
      this.authService.signin(this.formLogin.value).subscribe(() => {
        this.getInfoUser()
        this.getDataFamily()
        this.loadingService.dismiss()
      },
        (error) => {
          this.toastService.present(error.message)
          this.loadingService.dismiss()

          throw error
        })
    }
  }
  setLocalStore() {
    // this.accountService.getAccounts().subscribe(result => {
    //   localStorage.setItem('email',result.app_user.email) 
    //   if(result.app_user.avatar == null) {
    //     localStorage.setItem('avatar', "https://i.imgur.com/edwXSJa.png")
    //   }
    //   else {
    //     localStorage.setItem('avatar', result.app_user.avatar)
    //   }
    // })
  }
  getDataFamily() {
    this.familyService.getListFamily().subscribe(data => {
      localStorage.setItem('familyId', data.message.family[0]._id)
      this.router.navigate(['home'])
    },
    (error) =>{
      throw error
    })
  }
  getInfoUser() {
    this.accountService.getAccount().subscribe((data: any) => {
      localStorage.setItem('name', data.user.lName)
      localStorage.setItem('userId', data.user._id)
      localStorage.setItem('email', data.user.email)
      localStorage.setItem('avatar', data.user.avatar)
    })
  }

  submitSignUp() {
    this.loadingService.present()
    if (!this.canSubmitSignUp()) {
      this.markFormGroupTouched(this.formSignUp)
    } else if (!this.checkMatchConfirmedPassword()) {
      this.toastService.present('Password not match.')
    } else {
      this.authService.signup(this.formSignUp.value).subscribe((data: any) => {
        this.loadingService.dismiss()
        this.modalService.presentModal(ConfirmMailPage, this.formSignUp.value.email)
        this.formSignUp.reset()
      },
        (error) => {
          this.loadingService.dismiss()

          this.toastService.present(error.message)
        }
      )
    }
  }

  // showPass() {
  //   this.showpass = !this.showpass
  //   if (this.showpass) {
  //     this.type = 'text'
  //     this.name = 'eye-off-outline'
  //   }
  //   else {
  //     this.type = 'password'
  //     this.name = 'eye-outline'
  //   }
  // }

  clickForgotPassword() {
    this.router.navigate(['/forgot-password'])
  }

  checkMatchConfirmedPassword() {
    return this.formSignUp.get('password').value == this.formSignUp.get('confirmed_password').value
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched()

      if (control.controls) {
        this.markFormGroupTouched(control)
      }
    })
  }
  test() {
    this.geolocationService.openModalGoogleMap()
  }
}
