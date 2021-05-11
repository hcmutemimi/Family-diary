import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  public myDate = new Date().toISOString();
  myStartTime = '1990-02-19T07:43Z'
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

  ) { }

  ngOnInit() {
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
      userId: new FormControl(''),
      typeEventId: new FormControl('', Validators.required),
      familyId: new FormControl(''),
      colorCode: new FormControl('', Validators.required),
      visible: new FormControl(''),
      note: new FormControl(''),
      join: new FormControl('')
    })
  }

}
