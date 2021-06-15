import { CompilerConfig } from '@angular/compiler'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController, ModalController } from '@ionic/angular'
import { FamilyMemberService, FamilyService } from 'src/app/@app-core/@http-config'
import { LoadingService, ToastService } from 'src/app/@app-core/utils'
import { ChangepasswordPage } from 'src/app/changepassword/changepassword.page'
import { EditFamilyPage } from 'src/app/edit-family/edit-family.page'
import { InvitePage } from 'src/app/invite/invite.page'

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
  idHost: ''
  idMy
  check = false
  constructor(
    private route: ActivatedRoute,
    private familyMemberService: FamilyMemberService,
    private alert: AlertController,
    private modal: ModalController,
    private familyService: FamilyService,
    private toartService: ToastService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.idMy = localStorage.getItem('userId')
    this.loadingService.present()
  }
  ionViewWillEnter() {
    this.getData()
  }
  ionViewWillLeave() {
    this.idHost = ''
    this.getData()
  }
 
  getData() {
    this.route.queryParams.subscribe(params => {
      this.infoFamily = JSON.parse(params['data'])
      console.log(this.infoFamily)
      this.headerCustom.title = this.infoFamily?.name
      this.idFamily = this.infoFamily?._id
      console.log(this.idFamily,"===")
      if(this.idFamily == localStorage.getItem('familyId')) {
        this.check = true
      }
    this.getMember()
    })
  }
  async editProfileFamily() {
    const popover = await this.modal.create({
      component: EditFamilyPage,
      cssClass: 'modal-edit-family',
      componentProps: { id: this.idFamily, check: this.check }
    })
    await popover.present()
    popover.onDidDismiss().then(() => {
      this.getData()
      this.getInfo()
    })
  }
  getInfo() {
    let id = {
      familyId: this.idFamily
    }
    this.familyService.getById(id).subscribe(data =>{
      this.headerCustom.title = data.message.name
    })
  }
  getMember() {
    let queryParams = {
      familyId: this.idFamily
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
      this.listFamilyMember.map(i => {
          return i.avatar == null? i.avatar = 'assets/img/avatar.png': i.avatar
      });
      this.checkHost()
    })
  }
  checkHost() {
    this.listFamilyMember.forEach(element => {
      var param = {
        userId: '',
        familyId: localStorage.getItem('familyId')
      }
      param.userId = element._id
      this.familyService.checkHost(param).subscribe(
        (data) => {
          this.loadingService.dismiss()
          if (data.message != null) {
            if (element._id == data.message.userId) {
              this.idHost = element._id
              this.checkIsHost = true
            }
          }
        },
        (error) => {
          throw error
        }
      )
    })

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

    })
    await alertAvatarSetting.present()
  }
  removeFunction(idFamily, userId) {
    this.loadingService.present()
    this.familyMemberService.removeUser(idFamily, userId).subscribe(
      () => {
        this.toartService.present('Successfully !')
        this.getMember()
        this.loadingService.dismiss()
      },
      (error) => {
        if (error.message == 'YOU_ARE_HOST') {
          this.toartService.present('You are host of family, not allowed ')
        }
        throw error
      }
    )
  }
  deleteFunction(id) {
    this.familyService.deleteFamily(id).subscribe(
      () => {
        this.toartService.present('Delete successfully !')
        this.router.navigateByUrl('/home')
      },
      (error) => {
        throw error
      })
  }
  async openModalInvite() {
    const popover = await this.modal.create({
      component: InvitePage,
      cssClass: 'modal__Invite',
    })
    await popover.present()
    popover.onDidDismiss().then(() => {
      this.getMember()
    })
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

    })
    await alertAvatarSetting.present()
  }
}
