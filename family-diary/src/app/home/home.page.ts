import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountService, FamilyMemberService, FamilyService } from '../@app-core/@http-config';
import { LoadingService } from '../@app-core/utils';
import { NewFamilyPage } from '../new-family/new-family.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  avatar = localStorage.getItem('avatar');
  name = 'Trần Hoài Mi'
  avatarReplace = 'https://i.imgur.com/edwXSJa.png';
  listFamilyMember = []
  listFamily = []
  hasButton = false
  nameFamily
  nameUser
  selection
  nameIcon
  countFamily = []
  menu = [
    {
      name: 'ACTIVITY',
      thumbImage: 'assets/img/menu/activity.svg',
      desUrl: 'news',
      bg: '#edfaf1'
    },
    {
      name: 'CALENDAR',
      thumbImage: 'assets/img/menu/calendar.svg',
      desUrl: 'calendar',
      bg: '#fff1f0'
    },
    {
      name: 'TO-DO',
      thumbImage: 'assets/img/menu/todo.svg',
      desUrl: '/to-do',
      bg: '#EAFAFA'
    },

    {
      name: 'SHOPPING',
      thumbImage: 'assets/img/menu/shopping.svg',
      desUrl: 'pray',
      bg: '#EAFAFA'
    },
    {
      name: 'EVENT',
      thumbImage: 'assets/img/menu/event.svg',
      desUrl: '/event',
      bg: '#f6f3fa'
    },
    {
      name: 'MEAL PLANNER',
      thumbImage: 'assets/img/menu/meal.svg',
      desUrl: 'main/hymn-music',
      bg: '#dbf1ed'
    },
    {
      name: 'MAP',
      thumbImage: 'assets/img/menu/locator.svg',
      desUrl: 'donate',
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
      desUrl: 'main/hymn-video',
    },
  ]
  constructor(
    private router: Router,
    private familyMemberService: FamilyMemberService,
    public familyService: FamilyService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private modal: ModalController
  ) { }
  ngOnInit() {
    // this.loadingService.present()
    this.getInfoUser()
  }
  goToSetting() {
    this.router.navigateByUrl('/account-setting')
  }
  ionViewWillEnter() {
    this.getData()
  }
  async getData() {
    const result = await this.familyService.getListFamily().toPromise()
    this.listFamily = result.message.family
    this.nameFamily = this.listFamily[0].name
    this.selection = this.listFamily[0]._id
    localStorage.setItem('familyId', this.selection)
    this.nameIcon = this.listFamily[0].name
    this.getMember()
  }

  getMember() {
    let queryParams = {
      familyId: this.selection
    }
    this.familyMemberService.getListFamily(queryParams).subscribe(data => {
      this.listFamilyMember = data.message
      // this.loadingService.dismiss()
    })
  }
  getInfoUser() {
    this.accountService.getAccount().subscribe((data: any) => {
      this.nameUser = data.user.lName
      localStorage.setItem('name', this.nameUser)
      localStorage.setItem('userId', data.user._id)
      localStorage.setItem('email', data.user.email)
      localStorage.setItem('avatar', data.user.avatar)
    })
  }
  toggleHasSetting(hasButton) {
    this.hasButton = !hasButton;
  }
  savefamilyId(i, hasButton) {
    this.hasButton = !hasButton;
    this.selection = i._id
    localStorage.setItem('familyId', this.selection)
    this.nameFamily = i.name
    this.getMember()
  }
  goToDetail(item) {
    //   this.router.navigate(['/news'], {
    //     queryParams: {
    //       data: JSON.stringify(data)
    //     }
    //   })
    // }
    this.router.navigateByUrl(item.desUrl);
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
      this.getData();
    })
  }

}
