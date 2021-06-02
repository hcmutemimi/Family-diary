import { Component, Input, OnInit } from '@angular/core';
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
  code = ''
  wrong = false;
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private modalService: ModalService,
    ) { }

  ngOnInit() {
  }
  confirm() {
    let code = {
      code: this.code
    }
    let email = {
      email:  this.data.email
    }
    this.authService.activeAccount(email, code).subscribe(data => {
      this.modalService.dismiss()
      this.toastService.present('Sign up successfully! Let us start ')
    },
    (error) =>{
      throw error
    })
  }
}
