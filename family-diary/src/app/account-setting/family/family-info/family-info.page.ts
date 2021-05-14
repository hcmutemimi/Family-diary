import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FamilyMemberService, FamilyService } from 'src/app/@app-core/@http-config';
import { ChangepasswordPage } from 'src/app/changepassword/changepassword.page';

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.page.html',
  styleUrls: ['./family-info.page.scss'],
})
export class FamilyInfoPage implements OnInit {
  infoFamily
  headerCustom = {
    background: '#fff', title: ''
  }
  listFamilyMember
  constructor(
    private route: ActivatedRoute,
    private familyMemberService: FamilyMemberService,
    private alert: AlertController,
    private modal: ModalController
  ) { }
   
  ngOnInit() {
    this.getData()
    this.getMember()
  }
  getData() {
    this.route.queryParams.subscribe(params =>{
      this.infoFamily = JSON.parse(params['data'])
      this.headerCustom.title = this.infoFamily.name
    })
  }
  getMember() {
    let queryParams = {
      familyId: this.infoFamily._id
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
      // this.loadingService.dismiss()
    })
  }
  async removeUser(item) {
    let alertAvatarSetting = await this.alert.create({
      cssClass: 'alert-remove-user',
      header: 'Remove user?',
      message: 'Do you want remove user from this family?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Oke',
          handler: () => {
          }
        }
      ],
  
    });
    await alertAvatarSetting.present();
  }
  async openModalInvite() {
    const popover = await this.modal.create({
      component: ChangepasswordPage,
      cssClass: 'modalPassword',
    });
    return await popover.present();
  }
  async deleteFamily() {
    let alertAvatarSetting = await this.alert.create({
      cssClass: 'alert-remove-user',
      header: 'CONFIRM DELETE',
      message: 'Do you want delete this family?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Oke',
          handler: () => {
          }
        }
      ],
  
    });
    await alertAvatarSetting.present();
  }
}
