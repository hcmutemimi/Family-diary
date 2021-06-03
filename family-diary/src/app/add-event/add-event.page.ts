import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventService, FamilyMemberService } from '../@app-core/@http-config';
import { ToastService } from '../@app-core/utils';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  listFamilyMember = []
  name = 'far fa-star'
  headerCustom = {
    background: '#A88FCD', title: 'ADD NEW EVENT'
  }
  formAddEvent: FormGroup;
  subType = 'birthday'
  userJoin = []
  listName = []
  importance = false
  labelDateEnd = false
  elert = '1d'
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
    private route: Router,
    private modal: ModalController

  ) { }

  ngOnInit() {
    this.initForm()
    this.getMembers()
    this.listName.push({name: localStorage.getItem('name')})
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
          this.userJoin.push({id: i._id, name: i.lName})
        } else {
          i.join = false
        }
      })
    })
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
      elert: new FormControl('1d'),
      importance: new FormControl(''),
      visible: new FormControl('joined'),
      note: new FormControl(''),
      join: new FormControl('')
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
          this.userJoin.push({id: user._id, name: user.lName})
        }
        user.join = true
      }
    }
  }
  changeTime(item) {

    if(item.detail.checked) {
      this.labelDateEnd = true
      this.formAddEvent.get('dateEnd').setValue('ALL-DAY')
    }else {
      this.labelDateEnd = false
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
  selectSubType(item) {
    this.subType = item.detail.value
  }
  onSelectVisible(item) {
  }
  onSelectElert(item) {
    this.elert = item.detail.value
  }
  submitEvent() {
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
    this.eventService.createEvent(param).subscribe(data =>{
      this.modal.dismiss()
      this.toarstService.present('Create event successfully!')
      this.route.navigateByUrl('/event')
    })
  }
  


}
