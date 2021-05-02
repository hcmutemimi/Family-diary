import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  avatar = localStorage.getItem('avatar');
  name = 'Trần Hoài Mi'
  avatarReplace = 'https://i.imgur.com/edwXSJa.png';
  constructor() { }

  ngOnInit() {
  }

}
