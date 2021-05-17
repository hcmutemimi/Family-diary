import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../@http-config';

@Component({
  selector: 'app-popuplogout',
  templateUrl: './popuplogout.component.html',
  styleUrls: ['./popuplogout.component.scss'],
})
export class PopuplogoutComponent implements OnInit {

  constructor(  public modalController: ModalController,
     private authService: AuthService
    ) { }

  ngOnInit() {}
    dismissModal() {
      this.modalController.dismiss();
    }
    logout() {
      this.dismissModal()
      this.authService.logout()
    }
}
