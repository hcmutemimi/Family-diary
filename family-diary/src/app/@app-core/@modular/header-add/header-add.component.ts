import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header-add',
  templateUrl: './header-add.component.html',
  styleUrls: ['./header-add.component.scss'],
})
export class HeaderAddComponent implements OnInit {
  @Input() headerCustom;
  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() { }
  dismiss() {
    this.modal.dismiss()
  }
}
