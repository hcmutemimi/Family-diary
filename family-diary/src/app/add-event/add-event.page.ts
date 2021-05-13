import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FamilyMemberService } from '../@app-core/@http-config';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  public myDate = new Date().toISOString();
  listFamilyMember = []
  headerCustom = {
    background: '#A88FCD', title: 'ADD NEW EVENT'
  }
  formAddEvent: FormGroup;
  validMessage = {
    name: [
      { type: 'required', message: 'Name Event is required' },
    ],
    // dateStart: [
    //   { type: 'required', message: 'Date start is required' },
    // ],
    // dateEnd: [
    //   { type: 'required', message: 'Date end is required' },
    // ],
    // timeStart: [
    //   { type: 'required', message: ' Age is required' }
    // ],
    // timeEnd: [
    //   { type: 'required', message: 'Country is required' },
    // ],
    // visible: [ { type: 'required', message: 'Visible is required' }],
    // join: [{ type: 'required', message: 'user who is required' }]
  }
  constructor(
    private formBuilder: FormBuilder,
    private familyMemberService: FamilyMemberService

  ) { }

  ngOnInit() {
    this.initForm()
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
  initForm() {
    this.formAddEvent = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dateStart: new FormControl(''),
      dateEnd: new FormControl(''),
      timeStart: new FormControl(''),
      timeEnd: new FormControl(''),
      location: new FormControl(''),
      // typeEventId: new FormControl('', Validators.required),
      // familyId: new FormControl(''),
      colorCode: new FormControl(''),
      importance: new FormControl(''),
      visible: new FormControl(''),
      note: new FormControl(''),
      join: new FormControl('')
    })
  }

}
