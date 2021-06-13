import { CompilerConfig } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EventService, FamilyMemberService } from '../@app-core/@http-config';
import { LoadingService, ToastService } from '../@app-core/utils';
import { ModalAddTodoPage } from '../modal-add-todo/modal-add-todo.page';
import { ToDoDetailPage } from './to-do-detail/to-do-detail.page';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
})
export class ToDoPage implements OnInit {
  headerCustom = { title: 'TO-DO', };
  listFamilyMember
  name = 'far fa-star'
  userJoin = []
  listData = []
  listToDo = []
  listListToDo = []
  listJoined = []
  listFalse = []
  tabToDo = true
  importance = false
  active = true
  show = false
  param = {
    userId: localStorage.getItem('userId'),
    subType: '',
    familyId: localStorage.getItem('familyId')
  }
  id = localStorage.getItem('userId')
  constructor(
    private familyMemberService: FamilyMemberService,
    private router: Router,
    private modal: ModalController,
    private eventService: EventService,
    private toarstService: ToastService,
    private loadingService: LoadingService,
    private alertCtrl: AlertController

  ) { }

  ngOnInit() {
    this.loadingService.present()

  }
  ionViewWillEnter() {
    this.getMembers()
    this.getDataToDo()
    this.getDataListToDo()
  }
  getDataToDo() {
    this.param.subType = 'to-do'
    this.eventService.getAllEventByUser(this.param).subscribe(data => {
      this.listToDo = data.message
      this.listData = this.listToDo
      this.loadingService.dismiss()
    },
      (error) => {
        throw error
      })

  }

  getDataListToDo() {
    this.param.subType = 'list-to-do'
    this.eventService.getAllEventByUser(this.param).subscribe(data => {
      this.listListToDo = data.message
      this.loadingService.dismiss()
    },
      (error) => {
        throw error
      })
  }
  changeTabs(boolean) {
    this.tabToDo = boolean
  }
  changeStatus(item) {
    let request = {
      status: true
    }
    if (!item.done) {
      request.status = true
      this.eventService.updateStatusEvent(item._id, request).subscribe(data => {
        this.getDataToDo()
      })
    } else {
      request.status = false
      this.eventService.updateStatusEvent(item._id, request).subscribe(data => {
        this.getDataToDo()
      })
    }
  }
  getMembers() {
    let queryParams = {
      familyId: localStorage.getItem('familyId')
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
      this.loadingService.dismiss()
      this.listFamilyMember.forEach((i) => {
        if (i.avatar === null) {
          i.avatar = 'assets/img/avatar.png'
        }
        if (i._id == localStorage.getItem('userId')) {
          i.join = true
        } else {
          i.join = false
        }
      })
    })
  }
  gotoMain() {
    this.router.navigateByUrl('/home')
  }
  async gotoDetail(item) {
    // this.router.navigate(['/to-do/to-do-detail'],{
    //   queryParams: {
    //     data: JSON.stringify(item._id)
    //   }
    // })
    const modal = await this.modal.create({
      component: ToDoDetailPage,
      swipeToClose: true,
      cssClass: 'modal__addToDo',
      componentProps: { title: 'Detail To Do', id: item._id }
    })
    await modal.present()
    this.show = false
    modal.onDidDismiss().then(() => {
      this.getMembers()
      this.getDataToDo()
      this.getDataListToDo()
    })
  }
  async addList() {
    const modal = await this.modal.create({
      component: ModalAddTodoPage,
      swipeToClose: true,
      cssClass: 'modal__addToDo',
      componentProps: { title: 'NEW LIST' }
    })
    await modal.present()
    this.show = false
    modal.onDidDismiss().then(() => {
      this.getMembers()
      this.getDataToDo()
      this.getDataListToDo()
    })

  }

  async removeItem(item) {
    let alert = await this.alertCtrl.create({
      header: 'Remove To-Do ',
      message: 'Do you want remove this item?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.eventService.deleteEvent(item._id).subscribe(data => {
            })
          }
        }
      ]
    });
    await alert.present();

  }
  chooseUser(user) {
    if (user.join) {
      user.join = false
    } else {
      user.join = true
      this.param.userId = user._id

      this.listFamilyMember.forEach(i => {
        if (user._id != i._id) {
          i.join = false
        }
      });
      if (this.tabToDo) {
        this.getDataToDo()
      } else {
        this.getDataListToDo()
      }
    }
  }
  toggleImg() {
    if (this.importance) {
      this.name = 'far fa-star'
      this.importance = false
    }
    else {
      this.name = 'fas fa-star'
      this.importance = true

    }
  }
  clickBtnAll() {
    this.active = true
    this.listData = this.listToDo
  }
  clickBtnRemain() {
    this.active = false
    this.listData = this.listToDo.filter((i) => {
      return i.done == false
    })

  }
  toggleClick() {
    this.show = !this.show
  }

  async addToDo() {
    const modal = await this.modal.create({
      component: ModalAddTodoPage,
      swipeToClose: true,
      cssClass: 'modal__addToDo',
      componentProps: { title: 'NEW TO-DO' }
    })
    await modal.present()
    this.show = false
    modal.onWillDismiss().then(() => {
      this.getMembers()
      this.getDataToDo()
      this.getDataListToDo()
    })
  }
}
