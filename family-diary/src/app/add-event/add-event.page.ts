import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventService, FamilyMemberService } from '../@app-core/@http-config';
import { LoadingService, ToastService } from '../@app-core/utils';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  @Input() for: any
  @Input() data: any
  @Input() type: any
  listFamilyMember = []
  headerCustom = {
    background: '#A88FCD', title: 'NEW EVENT'
  }
  formAddEvent: FormGroup;
  subType = 'birthday'
  userJoin = []
  listName = []
  importance = false
  labelDateEnd = false
  elert = '1d'
  imgName
  textBtn
  hiddenType = false
  validMessage = {
    name: [
      { type: 'required', message: 'Name Event is required' },
    ],
    location: [
      { type: 'required', message: 'Location is required' },
    ],
  }
  constructor(
    private formBuilder: FormBuilder,
    private familyMemberService: FamilyMemberService,
    private eventService: EventService,
    private toarstService: ToastService,
    private loadingService: LoadingService,
    private route: Router,
    private modal: ModalController,
  ) { }

  ngOnInit() {
    if (this.for == 'add') {
      this.headerCustom.title = 'NEW EVENT'
      this.textBtn = 'CREATE'
    } else {
      this.headerCustom.title = 'DETAIL EVENT'
      this.textBtn = 'UPDATE'

    }
    if(this.type == 'birthday-ani') {
      this.hiddenType = true
    }
    this.initForm()
    this.loadingService.present()
    this.listName.push({ name: localStorage.getItem('name') })
    this.getData()
    this.getMembers()

  }
  initForm() {
    this.formAddEvent = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dateStart: new FormControl(''),
      dateEnd: new FormControl(''),
      subType: new FormControl('birthday'),
      location: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      alert: new FormControl('1d'),
      importance: new FormControl(''),
      visible: new FormControl('joined'),
      note: new FormControl(''),
      join: new FormControl('')
    })
  }
  getData() {
    this.formAddEvent.get('name').setValue(this.data?.name)
    this.formAddEvent.get('dateStart').setValue(this.data?.dateStart)
    this.formAddEvent.get('dateEnd').setValue(this.data?.dateEnd)
    this.formAddEvent.get('alert').setValue(this.data?.notiAlert)
    this.formAddEvent.get('note').setValue(this.data?.note)
    this.formAddEvent.get('importance').setValue(this.data?.importance)
    this.formAddEvent.get('subType').setValue(this.data?.subType)
    this.formAddEvent.get('location').setValue(this.data?.location)

    this.userJoin = this.data?.join
    if (this.formAddEvent.get('importance').value) {
      this.imgName = 'fas fa-star'
    } else {
      this.imgName = 'far fa-star'
    }
    this.subType = this.formAddEvent.get('subType').value
    if (this.formAddEvent.get('dateEnd').value == 'ALL-DAY') {
      this.labelDateEnd = true
    } else this.labelDateEnd = false
  }
  getMembers() {
    let queryParams = {
      familyId: localStorage.getItem('familyId')
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.loadingService.dismiss()
      this.listFamilyMember = data.message
      this.listFamilyMember.forEach((i) => {
        if (i.avatar === null) {
          i.avatar = 'assets/img/avatar.png'
        }
        if (this.for == 'add') {
          this.userJoin = []
          if (i._id == localStorage.getItem('userId')) {
            i.join = true
            this.userJoin.push({ id: i._id, name: i.lName })
          } else {
            i.join = false
          }
        } else {
          i.join = false
          this.userJoin.forEach(item => {
            if (i._id == item.id) {
              i.join = true
            }
          })
        }
      })

    })
  }

  toggleChooseUser(user) {
    if(this.for =='add') {
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
    }else {
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
  changeTime(item) {

    if (item.detail.checked) {
      this.labelDateEnd = true
      this.formAddEvent.get('dateEnd').setValue('ALL-DAY')
    } else {
      this.labelDateEnd = false
    }
  }
  toggleImg() {
    if (this.importance) {
      this.imgName = 'far fa-star'
      this.importance = false
    }
    else {
      this.imgName = 'fas fa-star'
      this.importance = true

    }
  }
  selectSubType(item) {
    this.subType = item.detail.value
  }
  onSelectVisible(item) {
  }
  onSelectElert(item) {
    this.elert = item.detail.value
  }
  submitEvent() {
    this.loadingService.present()
    let param = {
      name: this.formAddEvent.get('name').value,
      location: this.formAddEvent.get('location').value,
      dateStart: this.formAddEvent.get('dateStart').value,
      dateEnd: this.formAddEvent.get('dateEnd').value,
      subType: this.subType,
      importance: this.importance,
      familyId: localStorage.getItem('familyId'),
      typeEvent: "event",
      note: this.formAddEvent.get('note').value,
      join: this.userJoin
    }
    if (this.for == 'add') {
      this.eventService.createEvent(param).subscribe(data => {
        this.loadingService.dismiss()
        this.modal.dismiss()
        this.toarstService.present('Create event successfully!')
        this.route.navigateByUrl('/event')
      },
        () => {
          this.modal.dismiss()
          this.toarstService.present('Please check again!')
        })
    } else {
      this.eventService.update(this.data?._id, param).subscribe(data => {
        this.loadingService.dismiss()
        this.modal.dismiss()
        this.toarstService.present('Update event successfully!')
        this.route.navigateByUrl('/event')
      },
        () => {
          this.modal.dismiss()
          this.toarstService.present('Please check again!')
        })
    }

  }



}
