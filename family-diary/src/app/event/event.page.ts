import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventService } from '../@app-core/@http-config';
import { AddEventPage } from '../add-event/add-event.page';

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
    private route: Router,
    private modal: ModalController,
    private eventService: EventService

  ) { }

  ngOnInit() {
    this.getData()
  }
  async openAddEvent() {
    const modal = await this.modal.create({
      component: AddEventPage,
      swipeToClose: true,
      cssClass: 'modal__addToDo'
    })
    await modal.present()
  }
  changeTabsBirthday() {
    this.valueTag = 'birthday'
  }
  changeTabsAnni() {
    this.valueTag = 'anniversaries'
  }
  changeTabsOrther() {
    this.valueTag = 'orther'
  }
  addEvent() {
    this.route.navigateByUrl('add-event')
  }
  getData() {
    let param = {
      type: 'event'
    }
    this.eventService.getEvent(param).subscribe(data =>{
      console.log(data)
    })
  }
}
