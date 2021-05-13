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
      // this.loadingService.dismiss()
    })
  }
  gotoMain() {
    this.router.navigateByUrl('/home')

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
