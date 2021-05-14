import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/@app-core/utils/toast.service';
import { PATTERN } from '../../@app-core/@http-config/pattern.service';
import { LoadingService, } from '../../@app-core/utils/loading.service';
import { Inject } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  wrongCode = false;
  inputCode: FormGroup;
  inputstring = '';

  error_messages = {
    'code1': [
      { type: 'required', message: 'Không để trống trường này.' },
    ],
    'code2': [
      { type: 'required', message: 'Không để trống trường này.' },
    ],
    'code3': [
      { type: 'required', message: 'Không để trống trường này.' },
    ],
    'code4': [
      { type: 'required', message: 'Không để trống trường này.' },
    ],
    'code5': [
      { type: 'required', message: 'Không để trống trường này.' },
    ],
    'code6': [
      { type: 'required', message: 'Không để trống trường này.' },
    ],
  }

  httpOptions: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    // private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.inputCode = this.formBuilder.group({
      code1: ['',[Validators.required]],
      code2: ['',[Validators.required]],
      code3: ['',[Validators.required]],
      code4: ['',[Validators.required]],
      code5: ['',[Validators.required]],
      code6: ['',[Validators.required]]

    },);
   }
  ngOnInit() {
  }
  resendCode() {
    this.router.navigateByUrl('auth-manager/forgot-password');
  }
  keytab($event,prevInput, fieldInput, nextInput) {
    if(this.inputCode.value[fieldInput] !== null && this.inputCode.value[fieldInput] !== '' && this.inputCode.value[fieldInput].toString().length > 1) {
      const strSplit = this.inputCode.value[fieldInput].toString();
      this.inputCode.controls[fieldInput].setValue(strSplit[0]);
      this.inputCode.controls[nextInput].setValue(strSplit[1]);
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
      this.confirmCode();
    }
  }
  // onSubmit() {
  //   var c1 = this.inputCode.get('code1').value;
  //   var c2 = this.inputCode.get('code2').value;
  //   var c3 = this.inputCode.get('code3').value;
  //   var c4 = this.inputCode.get('code4').value;
  //   var c5 = this.inputCode.get('code5').value;
  //   var c6 = this.inputCode.get('code6').value;
  //   var inputstring = `${c1}${c2}${c3}${c4}${c5}${c6}`;
  // }

  confirmCode() {
    var c1 = this.inputCode.get('code1').value;
    var c2 = this.inputCode.get('code2').value;
    var c3 = this.inputCode.get('code3').value;
    var c4 = this.inputCode.get('code4').value;
    var c5 = this.inputCode.get('code5').value;
    var c6 = this.inputCode.get('code6').value;
    this.inputstring = (`${c1}${c2}${c3}${c4}${c5}${c6}`).toString();
    this.loadingService.present();

    if(this.inputstring == '') {
      this.loadingService.dismiss();
      this.toastService.present('Please type the OTP code!')
    } else {
      // this.authService.checkcodePassword({code: this.inputstring}).subscribe((data:any)=> {
      //   this.wrongCode = false;
      //   this.loadingService.dismiss();
      //   localStorage.setItem('authorization', data.token);
      //   this.router.navigateByUrl("/auth-manager/new-password");
      //   this.toastService.present('Code confirmed, present your new password!', 'top', 2000);
      // },
      // (data: any) =>{
      //   this.toastService.present(data.errors, 'top');
      //   this.wrongCode = true;
      //   this.loadingService.dismiss();
      // })
    }
  }
}
