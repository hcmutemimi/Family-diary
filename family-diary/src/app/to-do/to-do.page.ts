import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EventService, FamilyMemberService } from '../@app-core/@http-config';
import { ToastService } from '../@app-core/utils';
import { ModalAddTodoPage } from '../modal-add-todo/modal-add-todo.page';

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
  listJoined = []
  listFalse = []
  importance = false
  active = true
  show = false
  param = {
    userId: localStorage.getItem('userId'),
    type: 'to-do',
    familyId: localStorage.getItem('familyId')
  }
  constructor(
    private familyMemberService: FamilyMemberService,
    private router: Router,
    private modal: ModalController,
    private eventService: EventService,
    private toarstService: ToastService,
    private alertCtrl: AlertController

  ) { }

  ngOnInit() {
    this.getMembers()
    this.getData()
  }
  getData() {
    this.eventService.getEvent(this.param).subscribe(data => {
      this.listToDo = data.message
      this.listData = this.listToDo
      console.log(this.listToDo)
    })
  }

  changeStatus(item) {
    let request = {
      status: true
    }
    if (!item.done) {
      request.status = true
      this.eventService.updateStatusEvent(item._id, request).subscribe(data => {
        this.getData()
      })
    } else {
      request.status = false
      this.eventService.updateStatusEvent(item._id, request).subscribe(data => {
        this.getData()
      })
    }
  }
  getMembers() {
    let queryParams = {
      familyId: localStorage.getItem('familyId')
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
      this.listFamilyMember.forEach((i) => {
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
  gotoDetail(item) {
    let sendPrams = {

    }
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
              console.log(data)
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

      this.getData()
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
  addList() {
    this.show = false
  }
  async addToDo() {
    const modal = await this.modal.create({
      component: ModalAddTodoPage,
      swipeToClose: true,
      cssClass: 'modal__addToDo'
    })
    await modal.present()
    this.show = false
  }
}
