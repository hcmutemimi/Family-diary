import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalController: ModalController
  ) { }
  async presentModal(modalComponent, data) {
    const modal = await this.modalController.create({
      component: modalComponent,
      cssClass: 'confirm-modal',
      componentProps: {
        data: {
          email: data
        }
      }
    });
    return await modal.present();
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
