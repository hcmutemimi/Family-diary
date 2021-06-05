import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastService } from 'src/app/@app-core/utils/toast.service'
import { AuthService, PATTERN } from '../../@app-core/@http-config/'
import { LoadingService, } from '../../@app-core/utils/loading.service'
import { Inject } from '@angular/core'
import { HttpHeaders } from "@angular/common/http"
import { ThrowStmt } from '@angular/compiler'

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  wrongCode = false
  inputCode: FormGroup
  inputstring = ''
  email
  error_messages = {
    'code1': [
      { type: 'required', message: 'The field is not empty.' },
    ],
    'code2': [
      { type: 'required', message: 'The field is not empty.' },
    ],
    'code3': [
      { type: 'required', message: 'The field is not empty.' },
    ],
    'code4': [
      { type: 'required', message: 'The field is not empty.' },
    ],
    'code5': [
      { type: 'required', message: 'The field is not empty.' },
    ],
    'code6': [
      { type: 'required', message: 'The field is not empty.' },
    ],
  }

  httpOptions: any

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.inputCode = this.formBuilder.group({
      code1: ['',[Validators.required]],
      code2: ['',[Validators.required]],
      code3: ['',[Validators.required]],
      code4: ['',[Validators.required]],
      code5: ['',[Validators.required]],
      code6: ['',[Validators.required]]

    },)
   }
  ngOnInit() {
    // this.authService.receiveData.subscribe((data: any) => {
    // this.email = data.email
    // })
    this.email = localStorage.getItem('email')
  }
  resendCode() {
    this.router.navigateByUrl('/forgot-password')
  }
  keytab($event,prevInput, fieldInput, nextInput) {
    if(this.inputCode.value[fieldInput] !== null && this.inputCode.value[fieldInput] !== '' && this.inputCode.value[fieldInput].toString().length > 1) {
      const strSplit = this.inputCode.value[fieldInput].toString()
      this.inputCode.controls[fieldInput].setValue(strSplit[0])
      this.inputCode.controls[nextInput].setValue(strSplit[1])
      document.getElementById(nextInput).focus()
    } 
    if(this.inputCode.value[fieldInput] !== null && this.inputCode.value[fieldInput] !== '' && this.inputCode.value[fieldInput].toString().length === 1) {
      document.getElementById(nextInput).focus()
    }
    if (this.inputCode.value[fieldInput] === null || this.inputCode.value[fieldInput] === '') {
      document.getElementById(prevInput).focus()
    }
    if (fieldInput === 'code6')
    {
      this.confirmCode()
    }
  }

  confirmCode() {
    var c1 = this.inputCode.get('code1').value
    var c2 = this.inputCode.get('code2').value
    var c3 = this.inputCode.get('code3').value
    var c4 = this.inputCode.get('code4').value
    var c5 = this.inputCode.get('code5').value
    var c6 = this.inputCode.get('code6').value
    this.inputstring = (`${c1}${c2}${c3}${c4}${c5}${c6}`).toString()
    this.loadingService.present()

    if(this.inputstring == '') {
      this.loadingService.dismiss()
      this.toastService.present('Please type the OTP code!')
    } else {
      let param = {
        code: this.inputstring,
        email: this.email
      }
      this.authService.checkCode(param).subscribe(
        ()=> {
        this.wrongCode = false
        this.loadingService.dismiss()
        this.toastService.present('Code confirmed, Present your new password', 'top', 1000)
        this.router.navigateByUrl("/new-password")
      },
      (error) =>{
        this.toastService.present(error.message, 'top')
        this.wrongCode = true
        this.loadingService.dismiss()
        throw error
      })
    }
  }
}
