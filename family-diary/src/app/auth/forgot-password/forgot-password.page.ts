import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { catchError } from 'rxjs/operators'
import { AuthService } from 'src/app/@app-core/@http-config'
import { ToastService } from 'src/app/@app-core/utils/toast.service'
import { PATTERN } from '../../@app-core/@http-config/pattern'
import { LoadingService, } from '../../@app-core/utils/loading.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email
  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  goToVerification() {
    if (PATTERN.EMAIL.test(this.email)) {
      this.loadingService.present()
      this.authService.sendCode({ email: this.email }).subscribe(
        () => {
          this.loadingService.dismiss()
          this.authService.sendData({email: this.email})
          localStorage.setItem('email', this.email)
          this.toastService.present('Check the OTP code in your email!', 'top', 1000)
          this.router.navigateByUrl('/verification')

        },
        (error) => {
          this.loadingService.dismiss()
          this.toastService.present('Email is not available!', 'top', 2000)
          throw error
        }
      )
    }
    else {
      if (this.email == '') {
        this.loadingService.dismiss()
        this.toastService.present('Please enter your email!', 'top', 2000)
      }
      else {
        this.loadingService.dismiss()
        this.toastService.present('Email is invalid!', 'top', 2000)

      }
    }
  }

  getEmail(event) {
    this.email = event.target.value
  }
}
