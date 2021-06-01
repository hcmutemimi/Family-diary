import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventService, FamilyMemberService, FamilyService } from 'src/app/@app-core/@http-config';
import { ToastService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.page.html',
  styleUrls: ['./to-do-detail.page.scss'],
})
export class ToDoDetailPage implements OnInit {

  @Input() from: any
  @Input() title: any
  @Input() id: any
  listFamilyMember = []
  formEditToDo: FormGroup
  imgName
  repeat
  userJoin = []
  listName = []
  importance = false
  headerCustom = {
    title: '', background: '#00B0B2', modal: true
  }
  text: ''
  param: any
  idHost
  dataReceive
  checkIsHost
  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private familyMemberService: FamilyMemberService,
    private eventService: EventService,
    private toarstService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private familyService: FamilyService
  ) { }

  ngOnInit() {
    this.initForm()
    this.headerCustom.title = this.title
  }
  ionViewWillEnter() {
    this.checkHost()
    this.getData()
    this.getMembers()
  }

  initForm() {
    this.formEditToDo = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dateStart: new FormControl(''),
      dateEnd: new FormControl(''),
      importance: new FormControl(''),
      note: new FormControl(''),
      join: new FormControl(''),
      notiAlert: new FormControl(''),
      text: '',
      metaData: new FormControl([])
    })
  }
  getData() {
    this.eventService.getEventId(this.id).subscribe(
      (data) => {
        this.dataReceive = data.message
        this.formEditToDo.get('name').setValue(this.dataReceive.name)
        this.formEditToDo.get('dateStart').setValue(this.dataReceive.dateStart)
        this.formEditToDo.get('dateEnd').setValue(this.dataReceive.dateEnd)
        this.formEditToDo.get('notiAlert').setValue(this.dataReceive?.notiAlert)
        this.formEditToDo.get('note').setValue(this.dataReceive?.note)
        this.formEditToDo.get('importance').setValue(this.dataReceive?.importance)
        this.userJoin = this.dataReceive.join
        if (this.formEditToDo.get('importance').value) {
          this.imgName = 'fas fa-star'
        } else {
          this.imgName = 'far fa-star'
        }},
        (error) => {
          throw error
        }
    )
  }
  getMembers() {
    let queryParams = {
      familyId: localStorage.getItem('familyId')
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
      this.listFamilyMember.forEach((item) => {
        let check = false
        this.userJoin.forEach(i => {
          if (item._id == i.id) {
            item.join = true
            check = true
          }
        })
        if (!check) {
          item.join = false
        }
      })
    })
  }
  checkHost() {
    let param = {
      userId: localStorage.getItem('userId')
    }
    this.familyService.checkHost(param).subscribe(
      (data) => {
        this.idHost = data.message.userId
        if (this.idHost == localStorage.getItem('userId')) {
          this.checkIsHost = true
        }
      },
      (error) => {
        throw error
      }
    )
  }
  toggleChooseUser(user) {
    if (user._id !== this.idHost) {
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
  toggleImportance() {
    if (this.formEditToDo.get('importance').value) {
      this.imgName = 'fas fa-star'
      this.formEditToDo.get('importance').setValue(false)
    } else {
      this.imgName = 'far fa-star'
      this.formEditToDo.get('importance').setValue(true)
    }
  }
  onSelectRepeat(item) {
    this.formEditToDo.get('notiAlert').setValue(item.detail.value)
  }

  submitEvent() {
    this.param = {
      name: this.formEditToDo.get('name').value,
      location: '',
      dateStart: this.formEditToDo.get('dateStart').value,
      dateEnd: this.formEditToDo.get('dateEnd').value,
      importance: this.importance,
      familyId: localStorage.getItem('familyId'),
      typeEvent: "to-do",
      subType: "to-do",
      note: this.formEditToDo.get('note').value,
      join: this.userJoin,
      notiAlert: this.formEditToDo.get('notiAlert').value
    }
    // if (this.title == 'NEW TO-DO') {
    this.param.typeEvent = "to-do"
    this.param.subType = "to-do",
      this.eventService.update(this.id, this.param).subscribe(data => {
        this.toarstService.present('Updated successfully!')
        this.router.navigateByUrl('/to-do')
      },
        (error) => {
          throw error
        })
    // }
    //  else {
    //   this.param.typeEvent = "list-to-do"
    //   this.param.subType = "list-to-do",
    //     this.router.navigate(['/list-item'], {
    //       queryParams: {
    //         data: JSON.stringify(this.param)
    //       }
    //     })
    // }
    this.modal.dismiss()
  }
  deleteEvent() {
    this.eventService.deleteEvent(this.id).subscribe(data => {
      this.toarstService.present('Deleted successfully!')
      this.router.navigateByUrl('/to-do')
    },
      (error) => {
        throw error
      })
  }

}
