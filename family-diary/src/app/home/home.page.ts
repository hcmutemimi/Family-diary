import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, FamilyMemberService, FamilyService } from '../@app-core/@http-config';
import { LoadingService } from '../@app-core/utils';

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
      desUrl: 'assets/img/menu/todo.svg',
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
      desUrl: 'main/calendar',
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
    private accountService: AccountService
  ) { }
  ngOnInit() {
    // this.loadingService.present()
    this.getData()
    this.getInfoUser()
  }
  goToSetting() {
    this.router.navigateByUrl('/account-setting')
  }

  async getData() {
    const result = await this.familyService.getListFamily().toPromise()
    this.listFamily = result.message
    this.nameFamily = this.listFamily[0].name
    this.selection = result.message[0]._id
    this.nameIcon = this.listFamily[0].name
    this.getMember()
  }
  getInfoUser() {
    this.accountService.getAccount().subscribe((data: any)=> {
      this.nameUser = data.user.lName
      localStorage.setItem('name', this.nameUser)
    })
  }
  toggleHasSetting(hasButton) {
    this.hasButton = !hasButton;
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
  savefamilyId(i, hasButton) {
    this.hasButton = !hasButton;
    this.selection = i._id
    this.nameFamily = i.name
    this.getMember()
  }
  goToDetail(item) {
    if (item.desUrl == 'donate') {
      const data = {
        type: 'donate'
      }
      // this.authService.sendData(data)
      this.router.navigateByUrl(item.desUrl);

    }
    else if (item.desUrl == 'pray') {
      const data = {
        type: 'pray'
      }
      // this.authService.sendData(data)
      this.router.navigateByUrl(item.desUrl);

    }
    else if (item.desUrl == 'news') {
      const data = {
        id: localStorage.getItem('parish_id'),
        type: {
          detail: 'parish_news',
          general: 'news'
        }

      }
      this.router.navigate(['/news'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
    else this.router.navigateByUrl(item.desUrl);
  }


}
