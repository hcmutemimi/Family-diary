import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FamilyMemberService } from '../@app-core/@http-config';
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
  listName = []
  importance = false
  active = true
  show = false
  constructor(
    private familyMemberService: FamilyMemberService,
    private router: Router,
    private modal: ModalController

  ) { }

  ngOnInit() {
    this.getMembers()
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
          this.userJoin.push(i._id)
        } else {
          i.join = false
        }
      })
      // this.loadingService.dismiss()
    })
  }
  gotoMain() {
    this.router.navigateByUrl('/home')

  }
  toggleChooseUser(user) {
    if (user._id !== localStorage.getItem('userId')) {
      if (user.join) {
        this.userJoin.forEach((element, index) => {
          if (element == user._id) {
            this.userJoin.splice(index, 1)
            this.listName.forEach((item, i)=>{
              if(item.name === user.lName) {
                this.listName.splice(i,1)
              }
            })
          }
        })
        user.join = false

      }

      else {
        if (!this.userJoin.includes(user._id)) {
          this.userJoin.push(user._id)
          this.listName.push({name: user.lName})
        }
        user.join = true
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
  }
  clickBtnRemain() {
      this.active = false
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
