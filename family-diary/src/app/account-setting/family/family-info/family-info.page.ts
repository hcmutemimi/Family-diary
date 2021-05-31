import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FamilyMemberService, FamilyService } from 'src/app/@app-core/@http-config';
import { ToastService } from 'src/app/@app-core/utils';
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
  idFamily
  paramRemove = {
    userId: ''
  }
  checkIsHost = false
  idHost:''
  constructor(
    private route: ActivatedRoute,
    private familyMemberService: FamilyMemberService,
    private alert: AlertController,
    private modal: ModalController,
    private familyService: FamilyService,
    private toartService: ToastService,
    private router: Router
  ) { }
   
  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.getData()
    this.getMember()
    this.checkHost()
  }
  ionViewWillLeave() {
    this.getData()
    this.getMember()
  }
  getData() {
    this.route.queryParams.subscribe(params =>{
      this.infoFamily = JSON.parse(params['data'])
      this.headerCustom.title = this.infoFamily.name
      this.idFamily = this.infoFamily._id
    })
  }
  getMember() {
    let queryParams = {
      familyId: this.infoFamily._id
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
    })
  }
  checkHost() {
    let param = {
      userId: localStorage.getItem('userId')
    }
    this.familyService.checkHost(param).subscribe(
      (data)=>{
        this.idHost = data.message.userId
        if(this.idHost == localStorage.getItem('userId')) {
          this.checkIsHost = true
        }
      },
      (error) =>{
        throw error
      }
    )
  }
  async remove(item) {
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
            this.paramRemove.userId = item._id
            this.removeFunction(this.idFamily, this.paramRemove)
          }
        }
      ],
  
    });
    await alertAvatarSetting.present();
  }
  removeFunction(idFamily, userId) {
    this.familyMemberService.removeUser(idFamily, userId).subscribe(
      (data)=>{
        this.toartService.present('Leave successfully !')
        this.getMember()
      },
      (error)=>{
        if(error.message =='YOU_ARE_HOST') {
        this.toartService.present('You are host of family, not allowed ')
        }
        throw error

      }
    )
  }
  deleteFunction(id) {
    this.familyService.deleteFamily(id).subscribe(
      (data)=>{ 
        this.toartService.present('Delete successfully !')
        this.router.navigateByUrl('/home')
      },
      (error)=>{
        throw error
      })
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
      header: 'CONFIRM',
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
            this.deleteFunction(this.idFamily)
          }
        }
      ],
  
    });
    await alertAvatarSetting.present();
  }
}
