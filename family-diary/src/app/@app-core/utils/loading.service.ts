import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }
  async present() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }
  async dismiss() {
    let topLoader = await this.loadingController.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        break;
      }
      topLoader = await this.loadingController.getTop();
    }
  }
}
