import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  public myDate = new Date().toISOString();
  myStartTime = '1990-02-19T07:43Z'
  // dateStart,
  // dateEnd,
  // timeStart,
  // timeEnd,
  constructor() { }

  ngOnInit() {
  }

}
