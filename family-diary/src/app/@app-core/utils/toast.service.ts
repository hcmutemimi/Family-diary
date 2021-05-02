import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }
  async present(message?, position?, duration?, color?) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: message || '',
      duration: duration || 1000,
      position: position || 'top',
      color: color || 'dark'
    });
    toast.present();
  }
  
}
