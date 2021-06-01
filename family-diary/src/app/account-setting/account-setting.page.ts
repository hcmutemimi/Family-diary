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
  avatar:any
  constructor(
    public modalController: ModalController,
    // private popoverController: PopoverController,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.accountService.getAccount().subscribe(data => {
        this.avatar = data.user.avatar
    })
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
  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopupComponent,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }
}
