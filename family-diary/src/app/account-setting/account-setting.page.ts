import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountService } from '../@app-core/@http-config';
// import { AccountService } from '../@app-core/http';
// import { PopupComponent } from '../@modular/popup/popup.component';
import { PopuplogoutComponent } from '../@app-core/@modular/popuplogout/popuplogout.component';
import { ChangepasswordPage } from '../changepassword/changepassword.page';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {
  isOpeningModal = false;
  name = localStorage.getItem('name') || ''
  headerCustom = {
    background: '#fff', title: 'MANAGE FAMILY'
  }
  avatar
  constructor(
    public modalController: ModalController,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.avatar = localStorage.getItem('avatar')
    if(this.avatar == 'null') {
      this.avatar = 'assets/img/avatar.png'
    }
  }

  async openModalLogOut() {
    this.isOpeningModal = true
    const modal = await this.modalController.create({
      component: PopuplogoutComponent,
      swipeToClose: true,
      cssClass: 'modal__logout'
    })
    await modal.present()
  }
  async updatePassword() {
    this.isOpeningModal = true
    const modal = await this.modalController.create({
      component: ChangepasswordPage,
      swipeToClose: true,
      cssClass: 'modalPassword'
    })
    await modal.present()
  }
}
