import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) { }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: message,
      buttons: [{
        text: 'Agree',
        role: 'ok'
      }]
    });
    await alert.present();
  }
  async dismissAlert() {
    let topLoader = await this.alertController.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        break;
      }
      topLoader = await this.alertController.getTop();
    }
  }
}
