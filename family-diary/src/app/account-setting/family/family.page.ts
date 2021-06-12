import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/@app-core/@http-config/family/family.service';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
})
export class FamilyPage implements OnInit {
  listFamily: any
  listCount
  nameFamily
  selection
  headerCustom = {
    background: '#fff', title: 'YOUR FAMILY'
  }
  constructor(
    public familyService: FamilyService,
    private router: Router,
    private loadingService: LoadingService 
  ) { }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.loadingService.present()
    this.getData()
  }
  async getData() {
   this.familyService.getListFamily().subscribe(
     (result) =>{
      this.listFamily = result.message.family
      this.listCount = result.message.counts
      this.listFamily.forEach(e => {
          this.listCount.forEach(i => {
            if(i._id === e._id) {
              e.count = i.total
            }
          })
     })
  
    },
    (error) =>{
      throw error
    })
  }
  goToDetail(item) {
    localStorage.setItem('nameFamily',item.name)
    let data = item
    this.router.navigate(['account-setting/family/family-info'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

}
