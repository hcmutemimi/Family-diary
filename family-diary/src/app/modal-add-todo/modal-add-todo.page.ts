import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FamilyMemberService } from '../@app-core/@http-config';

@Component({
  selector: 'app-modal-add-todo',
  templateUrl: './modal-add-todo.page.html',
  styleUrls: ['./modal-add-todo.page.scss'],
})
export class ModalAddTodoPage implements OnInit {
  listFamilyMember = []
 headerCustom = {
   title: 'NEW TO-DO', background: '#00B0B2'
 }
  constructor(
    private modal: ModalController,
    private familyMemberService: FamilyMemberService
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

}
