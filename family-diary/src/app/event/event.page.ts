import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { EventService } from '../@app-core/@http-config';
import { DAY } from '../@app-core/@http-config/messages';
import { LoadingService, ToastService } from '../@app-core/utils';
import { AddEventPage } from '../add-event/add-event.page';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  headerCustom = {
    background: '#fff', title: 'EVENTS'
  }
  valueTag = 'birthday'
  param = {
    subType: '',
    familyId: localStorage.getItem('familyId')
  }
  paramHasUser = {
    subType: '',
    userId: localStorage.getItem('userId'),
    familyId: localStorage.getItem('familyId')
  }
  currentIndex = 0
  listDay = DAY

  listOrther = []
  listAni = []
  listBir = []
  listOrtherFinal = []
  listBirFinal = []
  listAniFinal = []

  constructor(
    private route: Router,
    private modal: ModalController,
    private loading: LoadingService,
    private eventService: EventService,
    private toarst: ToastService

  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.getData()
  }
  async openAddEvent() {
    const modal = await this.modal.create({
      component: AddEventPage,
      swipeToClose: true,
      cssClass: 'modal__addToDo'
    })
    await modal.present()
    modal.onWillDismiss().then(() => {
      this.reset()
    })
  }
  reset() {
    this.listOrtherFinal = []
    this.listBirFinal = []
    this.listAniFinal = []
    this.getData()
  }
  changeTabsBirthday() {
    this.valueTag = 'birthday'
    if (this.currentIndex != 0) {
      this.slides.slideTo(0)
    }
  }
  changeTabsAnni() {
    this.valueTag = 'anniversaries'
    if (this.currentIndex == 0) {
      this.slides.slideNext()
    } else if (this.currentIndex == 2) {
      this.slides.slidePrev()
    }
  }
  changeTabsOrther() {
    this.valueTag = 'orther'
    if (this.currentIndex != 2) {
      this.slides.slideTo(2)
    }
  }
  async slideChanged() {
    await this.slides.getActiveIndex().then(i => {
      if (i == 0) {
        this.valueTag = 'birthday'
        this.currentIndex = 0
      } else if (i == 1) {
        this.valueTag = 'anniversaries'
        this.currentIndex = 1
      } else {
        this.valueTag = 'orther'
        this.currentIndex = 2
      }
    })
  }
  addEvent() {
    this.route.navigateByUrl('add-event')
  }
  getData() {
    this.param.subType = 'orther'
    this.loading.present()
    this.eventService.getEvent(this.param).subscribe(data => {
      this.listOrther = data.message
      this.handleDate(this.listOrther)
      this.handle(this.listOrther, 'cutDate', this.listOrtherFinal)
      this.loading.dismiss()
    },
    (error) =>{
      this.toarst.present(error.message)
      throw error
    })
    this.paramHasUser.subType = 'birthday'
    this.eventService.getEventFamily(this.paramHasUser).subscribe(data => {
      this.listBir = data.message
      this.handleDate(this.listBir)
      this.handle(this.listBir, 'cutDate', this.listBirFinal)
      this.loading.dismiss()
    },
    (error) =>{
      this.toarst.present(error.message)
      throw error
    })
    this.paramHasUser.subType = 'anniversaries'
    this.eventService.getEventFamily(this.paramHasUser).subscribe(data => {
      this.listAni = data.message
      this.handleDate(this.listAni)
      this.handle(this.listAni, 'cutDate', this.listAniFinal)
      this.loading.dismiss()
    },
    (error) =>{
      this.toarst.present(error.message)
      throw error
    })

  }
  handleDate(list) {
    list.forEach(item => {
      item['cutDate'] = item.dateStart.slice(0, 7)
      const birthday = new Date(item.dateStart)
      const day = birthday.getDay();
      this.listDay.find(i => {
        if (i.day == day) {
          item['day'] = i.text
        }
      })
    })
  }
  handle(list, param, final) {
    let handle = list.map(item => item[param])
    handle = [...new Set(handle)]
    handle.forEach(i => {
      const result = list.filter(item => {
        return item[param] === i
      })
      final.push(result)
    })
  }

}
