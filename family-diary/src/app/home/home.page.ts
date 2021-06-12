import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { AccountService, EventService, FamilyMemberService, FamilyService } from '../@app-core/@http-config';
import { LoadingService, ToastService } from '../@app-core/utils';
import { GeolocationService } from '../@app-core/utils/geolocation.service';
import { NewFamilyPage } from '../new-family/new-family.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  avatar = localStorage.getItem('avatar');
  slideOpts = {
    centeredSlides: true,
    loop: true,
    setInitialSlide: 0,
    autoplay: true
  };
  name = 'Trần Hoài Mi'
  avatarReplace = 'https://i.imgur.com/edwXSJa.png';
  listFamilyMember = []
  hasButton
  nameFamily
  nameUser
  selection
  nameIcon
  idFM
  countFamily = []
  listCount = []
  listFM = []
  listFamily = []
  history = false
  subscribe: any
  count = 0
  public alertPresented = false
  dataToDo = []
  dataEvent = []
  checkInfo
  hasFamily
  menu = [
    {
      name: 'ACTIVITY',
      thumbImage: 'assets/img/menu/activity.svg',
      desUrl: '/activity-detail',
      bg: '#edfaf1'
    },
    {
      name: 'CALENDAR',
      thumbImage: 'assets/img/menu/calendar.svg',
      desUrl: 'calendar-event',
      bg: '#fff1f0'
    },
    {
      name: 'TO-DO',
      thumbImage: 'assets/img/menu/todo.svg',
      desUrl: '/to-do',
      bg: '#EAFAFA'
    },

    // {
    //   name: 'SHOPPING',
    //   thumbImage: 'assets/img/menu/shopping.svg',
    //   desUrl: '',
    //   bg: '#EAFAFA'
    // },
   
    // {
    //   name: 'MEAL PLANNER',
    //   thumbImage: 'assets/img/menu/meal.svg',
    //   desUrl: '',
    //   bg: '#dbf1ed'
    // },
    {
      name: 'MAP',
      thumbImage: 'assets/img/menu/locator.svg',
      desUrl: '/map',
    },
    {
      name: 'EVENT',
      thumbImage: 'assets/img/menu/event.svg',
      desUrl: '/event',
      bg: '#f6f3fa'
    },
    {
      name: 'GALLERY',
      thumbImage: 'assets/img/menu/photo.svg',
      desUrl: 'main/store',
      bg: '#edfaf1'
    },
    {
      name: 'ABOUT US',
      thumbImage: 'assets/img/menu/about-us.svg',
      desUrl: 'about-us',
    },
  ]
  queryParam = {
    familyId: '',
    userId: localStorage.getItem('userId'),
    subType: '',
  }
  constructor(
    private router: Router,
    private familyMemberService: FamilyMemberService,
    public familyService: FamilyService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private modal: ModalController,
    private platform: Platform,
    private toastService: ToastService,
    private navController: NavController,
    private alertController: AlertController,
    private eventService: EventService
    // private geolocationService: GeolocationService,


  ) { }
  ngOnInit() {
    this.blockBackBtn()
    this.queryParam.familyId = localStorage.getItem('familyId')
   
  }
  blockBackBtn() {
    this.subscribe = this.platform.backButton.subscribe(() => {
      if (this.router.url === '/home') {
        this.count++;
        if (this.count == 1) {
          this.toastService.present('Press again to exit app!');
        }
        else {
          navigator['app'].exitApp()
        }
        setTimeout(() => {
          this.count = 0;
        }, 2000);
      }
      else {
        this.navController.back();
      }
    })
  }
  // async presentAlert() {
  //   this.alertPresented = true;
  //   const alert = await this.alertController.create({
  //     cssClass: 'logout-alert',
  //     header: 'Do you want to exit app?',
  //     mode: 'ios',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           this.alertPresented = false;
  //           return;
  //         }
  //       },
  //       {
  //         text: 'Agree',
  //         handler: () => {
  //           localStorage.removeItem('isRepeat');
           
  //         }
  //       },
  //     ]
  //   });
  //   await alert.present();
  // }
  ionViewWillEnter() {
    this.loadingService.present()
    this.getDataToDo()
    this.getDataEvent()
    this.getInfoUser()

    if(localStorage.getItem('hasFamily')) {
      this.getFamily()
    }else {
      this.getInitData()
    }
  }
  goToSetting() {
    this.router.navigateByUrl('/account-setting')
  }
  getInitData() {
    this.familyService.getListFamily().subscribe(data => {
      this.listFamily = data.message.family
      this.listCount = data.message.counts
      this.listFM = data.message.listFM
      this.listFamily.forEach(e => {
        this.listCount.forEach(i => {
          if (i._id === e._id) {
            e.count = i.total
          }
        })
        this.listFM.forEach(i => {
          if (i.familyId === e._id) {
            e.fm = i.idFM
          }
        })
      })
      this.nameFamily = this.listFamily[0]?.name
      this.selection = this.listFamily[0]?._id
      localStorage.setItem('nameFamily', this.nameFamily)
      localStorage.setItem('familyId', this.selection)
      localStorage.setItem('hasFamily', 'true')
      this.idFM = this.listFamily[0]?.fm
      localStorage.setItem('idFM', this.idFM)
      this.getMember()
    })
    
  }
  getFamily() {
    this.nameFamily = localStorage.getItem('nameFamily')
    this.familyService.getListFamily().subscribe(data => {
      this.listFamily = data.message.family
      this.listCount = data.message.counts
      this.listFM = data.message.listFM
      this.listFamily.forEach(e => {
        this.listCount.forEach(i => {
          if (i._id === e._id) {
            e.count = i.total
          }
        })
        this.listFM.forEach(i => {
          if (i.familyId === e._id) {
            e.fm = i.idFM
          }
        })
      })
      this.getMember()
    })
  }
   getDataToDo() {
     this.queryParam.subType = 'to-do'

    this.eventService.getEventFamily(this.queryParam).subscribe(data => {
      this.dataToDo = data.message
      this.dataToDo.sort(function (a, b) {
        return new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()
      })
    },
      (error) => {
        throw error
      })
  }
  getDataEvent() {
    this.queryParam.subType = 'orther'
    this.eventService.getEventFamily(this.queryParam).subscribe(data => {
      this.dataEvent = data.message
      this.dataEvent.sort(function (a, b) {
        return new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()
      })
    },
      (error) => {
        throw error
      })
  }
  getMember() {
    let queryParams = {
      familyId: localStorage.getItem('familyId')
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
      this.getHistoryStatus()
    })
  }
  getHistoryStatus() {
    let p = {
      familyMemberId: localStorage.getItem('idFM')
    }
    this.familyMemberService.historyStatus(p).subscribe(data => {
      this.loadingService.dismiss()
      this.history = data.message.history
    })
  }
  getInfoUser() {
    this.accountService.getAccount().subscribe((data: any) => {
      this.nameUser = data.user.lName
      if (data.user.lName === null ||
        data.user.fName === null ||
        data.user.birthday === null ||
        data.user.name === null ||
        data.user.email === null ||
        data.user.phoneNumber === null ||
        data.user.birthday === null ||
        data.user.avatar === null ||
        data.user.lat === null ||
        data.user.long === null
      ) {
        this.checkInfo = true
      }
    })
  }
  toggleHasSetting(hasButton) {
    this.hasButton = !hasButton;
  }
  savefamilyId(i, hasButton) {
    this.loadingService.present()
   
    this.hasButton = !hasButton;
    this.selection = i._id
    localStorage.setItem('familyId', this.selection)
    this.nameFamily = i.name
    localStorage.setItem('nameFamily', this.nameFamily)
   
    var r = this.listFM.filter(i => {
      return i.familyId == this.selection
    })
    this.idFM = r[0].idFM
    localStorage.setItem('idFM', this.idFM)
    this.queryParam.familyId = this.selection
    this.getDataToDo()
    this.getDataEvent()
    this.getInfoUser()
    this.getMember()
  }
  async goToDetail(item) {

    if (item.desUrl == '/map') {
      // this.geolocationService.openModalGoogleMap();

      // const modal = await this.modal.create({
      //   component: ActivityPage,
      //   swipeToClose: true,
      //   cssClass: 'modal__addToDo'
      // })
      // await modal.present()
      // modal.onWillDismiss().then(() => {
      //   this.getData();
      // })
    }
    else this.router.navigateByUrl(item.desUrl);
  }
  async gotoNewFamily() {
    this.hasButton = false
    const modal = await this.modal.create({
      component: NewFamilyPage,
      swipeToClose: true,
      cssClass: 'modal__addToDo'
    })
    await modal.present()
    modal.onWillDismiss().then(() => {
      this.getFamily();
    })
  }

}
