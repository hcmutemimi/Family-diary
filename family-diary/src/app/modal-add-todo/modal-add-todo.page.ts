import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventService, FamilyMemberService } from '../@app-core/@http-config';
import { LoadingService, ToastService } from '../@app-core/utils';

@Component({
  selector: 'app-modal-add-todo',
  templateUrl: './modal-add-todo.page.html',
  styleUrls: ['./modal-add-todo.page.scss'],
})
export class ModalAddTodoPage implements OnInit {
  @Input() from: any
  @Input() title: any
  listFamilyMember = []
  formAddToDo: FormGroup
  name = 'far fa-star'
  repeat = 'never'
  userJoin = []
  listName = []
  importance = false
  headerCustom = {
    title: '', background: '#00B0B2'
  }
  text: ''
  param: any
  nameTextButton
  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private familyMemberService: FamilyMemberService,
    private eventService: EventService,
    private toarstService: ToastService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present()
    this.getMembers()
    this.initForm()
    this.headerCustom.title = this.title
    if (this.title == 'NEW TO-DO') {
      this.nameTextButton = 'Create'
    } else {
      this.nameTextButton = 'Next'
    }
  }
  initForm() {
    this.formAddToDo = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dateStart: new FormControl(''),
      dateEnd: new FormControl(''),
      importance: new FormControl(''),
      note: new FormControl(''),
      join: new FormControl(''),
      text: '',
      metaData: new FormControl([])
    })
  }
  getMembers() {
    let queryParams = {
      familyId: localStorage.getItem('familyId')
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
      this.loadingService.dismiss()
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
    this.loadingService.present()
    this.param = {
      name: this.formAddToDo.get('name').value,
      location: '',
      dateStart: this.formAddToDo.get('dateStart').value,
      dateEnd: this.formAddToDo.get('dateEnd').value,
      importance: this.importance,
      familyId: localStorage.getItem('familyId'),
      typeEvent: "to-do",
      subType: "to-do",
      notiAlert: this.repeat,
      note: this.formAddToDo.get('note').value,
      join: this.userJoin,
    }
    if (this.title == 'NEW TO-DO') {
      this.param.typeEvent = "to-do"
      this.param.subType = "to-do",
        this.eventService.createEvent(this.param).subscribe(data => {
          this.loadingService.dismiss()
          this.modal.dismiss()
          this.toarstService.present('Create new to-do successfully!')
          this.router.navigateByUrl('/to-do')
        },
          (error) => {
            throw error
          })
    } else {
      this.modal.dismiss()
      this.param.typeEvent = "list-to-do"
      this.param.subType = "list-to-do",
        this.router.navigate(['/list-item'], {
          queryParams: {
            data: JSON.stringify(this.param)
          }
        })
    }

  }

}
