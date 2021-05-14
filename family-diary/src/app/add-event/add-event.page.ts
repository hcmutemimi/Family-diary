import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventService, FamilyMemberService } from '../@app-core/@http-config';

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
  myDateStart = new Date().toISOString();
  myDateEnd = new Date().toISOString();
  
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
    private eventService: EventService

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
          this.userJoin.push(i._id)
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
  changeTime(item) {
    if(item.detail.checked) {
      this.labelDateEnd = true
      this.myDateEnd = 'ALL-DAY'
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
      dateStart: this.myDateStart,
      dateEnd: this.myDateEnd,
      subType: this.subType,
      importance: this.importance,
      familyId: localStorage.getItem('familyId'),
      typeEvent: "event",
      note: this.formAddEvent.get('note').value,
      join: this.userJoin
    }
    this.eventService.createEvent(param).subscribe(data =>{
      console.log(data)
    })
  }


}
