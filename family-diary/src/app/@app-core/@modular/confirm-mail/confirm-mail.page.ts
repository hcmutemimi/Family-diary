import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService, ToastService } from '../../utils';
import { AuthService } from './../../../@app-core/@http-config' 

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.page.html',
  styleUrls: ['./confirm-mail.page.scss'],
})
export class ConfirmMailPage implements OnInit {
  @Input() data;
  wrong = false;
  formCheckCode: FormGroup
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.formCheckCode = this.formBuilder.group({
        code: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {
  }
  confirm() {
    let param = {
      code: this.formCheckCode.get('code').value,
      email: this.data.email
    }
    this.authService.activeAccount(param).subscribe(data => {
      this.modalService.dismiss()
      this.toastService.present('Sign up successfully! Let us start ')
      this.router.navigateByUrl('/login')
    },
    (error) =>{
      throw error
    })
  }
}
