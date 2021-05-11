import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popuplogout',
  templateUrl: './popuplogout.component.html',
  styleUrls: ['./popuplogout.component.scss'],
})
export class PopuplogoutComponent implements OnInit {

  constructor(  public modalController: ModalController, private router: Router,
    ) { }

  ngOnInit() {}
  async presentModal() {
    const modal = await this.modalController.create({
      component: PopuplogoutComponent,
      swipeToClose: true,
      cssClass: 'modal__logout'
    });
}
    dismissModal() {
      this.modalController.dismiss(null, 'cancel');
    }
    logout() {
      this.modalController.dismiss(null, 'cancel');
      localStorage.clear()
    }
}
