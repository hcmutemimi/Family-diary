import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventService, FamilyMemberService } from '../@app-core/@http-config';
import { ToastService } from '../@app-core/utils';

@Component({
  selector: 'app-modal-add-todo',
  templateUrl: './modal-add-todo.page.html',
  styleUrls: ['./modal-add-todo.page.scss'],
})
export class ModalAddTodoPage implements OnInit {
 
  listFamilyMember = []
  formAddToDo: FormGroup
  name = 'far fa-star'
  repeat = 'never'
  userJoin = []
  listName = []
  importance = false
  myDateEnd = new Date().toISOString()
  headerCustom = {
    title: 'NEW TO-DO', background: '#00B0B2'
  }
  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private familyMemberService: FamilyMemberService,
    private eventService: EventService,
    private toarstService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMembers()
    this.initForm()
  }
  initForm() {
    this.formAddToDo = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dateEnd: new FormControl(''),
      importance: new FormControl(''),
      note: new FormControl(''),
      join: new FormControl('')
    })
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
          this.userJoin.push({ id: i._id, name: i.lName })
        } else {
          i.join = false
        }
      })
    })
  }
  toggleChooseUser(user) {
    if (user._id !== localStorage.getItem('userId')) {
      if (user.join) {
        this.userJoin.forEach((element, index) => {
          if (element.id == user._id) {
            this.userJoin.splice(index, 1)
          }
        })
        user.join = false

      }
      else {
        if (!this.userJoin.includes(user._id)) {
          this.userJoin.push({ id: user._id, name: user.lName })
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
  toggleImportance() {
    if (this.importance) {
      this.name = 'far fa-star'
      this.importance = false
    } else {
      this.name = 'fas fa-star'
      this.importance = true
    }
  }
  onSelectRepeat(item) {
    this.repeat = item.detail.value
  }
  submitEvent() {
    let param = {
      name: this.formAddToDo.get('name').value,
      location: '',
      dateStart: "",
      dateEnd: this.myDateEnd,
      importance: this.importance,
      familyId: localStorage.getItem('familyId'),
      typeEvent: "to-do",
      note: this.formAddToDo.get('note').value,
      join: this.userJoin,
      done: false
    }
    this.eventService.createEvent(param).subscribe(data => {
      this.toarstService.present('Create new to-do successfully!')
      this.modal.dismiss()
      this.router.navigateByUrl('/to-do')
    })
  }

}
