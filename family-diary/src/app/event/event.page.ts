import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  headerCustom = {
    background: '#fff', title: 'EVENTS'
  }
  valueTag = 'birthday'
  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }
  changeTabsBirthday() {
    this.valueTag = 'birthday'
    console.log(this.valueTag)
  }
  changeTabsAnni() {
    this.valueTag = 'anniversaries'

    console.log(this.valueTag)
  }
  changeTabsOrther() {
    this.valueTag = 'orther'

    console.log(this.valueTag)
  }
  addEvent() {
    this.route.navigateByUrl('add-event')
  }
}
