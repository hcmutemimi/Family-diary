import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  avatar = localStorage.getItem('avatar');
  name = 'Trần Hoài Mi'
  avatarReplace = 'https://i.imgur.com/edwXSJa.png';
 
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
      bg:'#fff1f0'
    },
    {
      name: 'TO-DO',
      thumbImage: 'assets/img/menu/lophocgiaoly.svg',
      desUrl:  'assets/img/menu/todo.svg',
    },
    {
      name: 'Đóng góp',
      thumbImage: 'assets/img/menu/donggop.svg',
      desUrl: 'donate',
    },
    {
      name: 'Xin lễ',
      thumbImage: 'assets/img/menu/xinle.svg',
      desUrl: 'pray',
    },
    {
      name: 'Lịch Công giáo',
      thumbImage: 'assets/img/menu/lichconggiao.svg',
      desUrl: 'main/calendar',
    },
    {
      name: 'Cửa hàng',
      thumbImage: 'assets/img/menu/cuahang.svg',
      desUrl: 'main/store',
    },
    {
      name: 'Nhạc Thánh Ca',
      thumbImage: 'assets/img/menu/thanhca.svg',
      desUrl: 'main/hymn-music',
    },
    {
      name: 'Video bài giảng',
      thumbImage: 'assets/img/menu/baigiang.svg',
      desUrl: 'main/hymn-video',
    },
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goToUserInfo() {
    this.router.navigateByUrl('/account-setting')
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
