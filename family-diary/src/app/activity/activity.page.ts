import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FamilyService } from '../@app-core/@http-config';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  listFamily: any
  listCount
  nameFamily
  listFM
  activeitem = localStorage.getItem('idFM')
  headerCustom = {
    background: '#fff', title: 'HISTORIES ACTIVITY'
  }
  constructor(
    public familyService: FamilyService,
    private router: Router,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.getData()
    console.log(this.activeitem)
  }
  async getData() {
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
    })

  }
  
  gotoActivities(item) {
    localStorage.setItem('idFM', item);
    this.activeitem = item
    setTimeout(() => {
      this.modal.dismiss();
    },300);
    this.router.navigate(['/activity/activity-detail'], {
      queryParams: {
        data: JSON.stringify(item)
      }
    })
  }
 
}
