import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header-add',
  templateUrl: './header-add.component.html',
  styleUrls: ['./header-add.component.scss'],
})
export class HeaderAddComponent implements OnInit {
  @Input() headerCustom;
  name ='fas fa-times'
  constructor(
    private modal: ModalController,
    private router: Router
  ) { }

  ngOnInit() { 
    this.headerCustom.back? this.name ='fas fa-arrow-left': this.name ='fas fa-times'
  }
  dismiss() {
    if(this.headerCustom.back == true) {
      this.router.navigateByUrl('to-do')
    }else {
      this.modal.dismiss()

    }
  }
  goToDo() {
    this.router.navigateByUrl('/to-do')
  }
}
