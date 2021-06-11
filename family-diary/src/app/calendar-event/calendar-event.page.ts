import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../@app-core/@http-config';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.page.html',
  styleUrls: ['./calendar-event.page.scss'],
})
export class CalendarEventPage implements OnInit {
  headerCustom = {
    background: '#fd7160', title: 'CALENDAR', color: '#fff'
  }
  daysofMonth = []
  nameMonth
  nameYear
  year
  currentDate = new Date()
  day = this.currentDate.getDate()
  today = this.currentDate.toString().slice(0,15)
  currentMonth: any
  currentYear 
  paramMonth
  show = false
  param = {
    date:'',
    familyId: localStorage.getItem('familyId')
  }
  DATES = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]
  listData = []
  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentMonth = this.currentDate.getMonth()
    this.currentYear =  this.currentDate.getFullYear()
    this.nameMonth = this.currentMonth + 1
    this.paramMonth = this.nameMonth
    this.year = this.currentYear
    
    this.getDaysInMonthUTC(this.currentMonth, this.year)
    this.paramMonth = (parseInt(this.paramMonth)) < 10 ? `0${this.paramMonth}`: this.paramMonth
    this.param.date =  `${this.year}` + '-'+ `${this.paramMonth}`
    this.getEvent()
  }
  toggleClick() {
    this.show = !this.show
  
  }
  gotoShopping() {
    this.show = !this.show
  }
  gotoToDo() {
    this.show = !this.show
    // this.router.navigateByUrl('/modal-add-todo')
  }
  gotoEvent() {
    this.show = !this.show
  }
 getEvent() {
   this.listData = []
  this.eventService.getEventByMonth(this.param).subscribe(data => {
    this.listData = data.message
    this.listData.forEach( i=> {
      var date = new Date(i.dateStart).toString().slice(0,15)
        this.daysofMonth.forEach( m =>{
          if(date == m.today) {
            m['check'] = true
          }
        })
    })
  })
 }
  prevMonth() {
    this.daysofMonth = []
    this.nameMonth = this.nameMonth - 1
    this.currentMonth = this.currentMonth - 1
    if (this.currentMonth == 0) {
      this.currentMonth = 11
      this.nameMonth = 12
      this.year = this.year - 1
    }
    this.getDaysInMonthUTC(this.currentMonth, this.year)
    this.paramMonth = (parseInt(this.nameMonth)) < 10 ? `0${this.nameMonth}`: this.nameMonth
    this.param.date =  `${this.year}` + '-'+ `${this.paramMonth}`
    this.getEvent()
  }
  nextMonth() {
    this.daysofMonth = []
    this.nameMonth = this.nameMonth + 1
    this.currentMonth = this.currentMonth + 1
    if (this.currentMonth == 12) {
      this.currentMonth = 0
      this.nameMonth = 1
      this.year = this.year + 1
    }
    this.getDaysInMonthUTC(this.currentMonth, this.year)
    this.paramMonth = (parseInt(this.nameMonth)) < 10 ? `0${this.nameMonth}`: this.nameMonth
    this.param.date =  `${this.year}` + '-'+ `${this.paramMonth}`
    this.getEvent()
  }
  getDaysInMonthUTC(month, year) {
    var date = new Date(Date.UTC(year, month, 1))
    var stringDateMonth = new Date(date).toISOString().slice(0, 7)
    while (date.getUTCMonth() === month) {
      this.daysofMonth.push({
        day: new Date(date).toString().slice(8, 10),
        date: new Date(date).toString().slice(0, 3),
        today: date.toString().slice(0,15),
      })
      date.setUTCDate(date.getUTCDate() + 1)
    }
    switch (this.daysofMonth[0].date) {
      case 'Sun':
        this.daysofMonth[0]['mr'] = '0vw'
        break
      case 'Mon':
        this.daysofMonth[0]['mr'] = '13vw'
        break
      case 'Tue':
        this.daysofMonth[0]['mr'] = '26vw'
        break
      case 'Wed':
        this.daysofMonth[0]['mr'] = '39vw'
        break
      case 'Thu':
        this.daysofMonth[0]['mr'] = '52vw'
        break
      case 'Fri':
        this.daysofMonth[0]['mr'] = '65vw'
        break
      case 'Sat':
        this.daysofMonth[0]['mr'] = '78vw'
        break
    }
   
    return this.daysofMonth
  }
}
