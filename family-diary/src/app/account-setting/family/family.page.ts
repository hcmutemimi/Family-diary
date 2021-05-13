import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/@app-core/@http-config/family/family.service';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.getData()
  }
  async getData() {
    const result = await this.familyService.getListFamily().toPromise()
    this.listFamily = result.message.family
    this.listCount = result.message.counts
    this.listFamily.forEach(e => {
        this.listCount.forEach(i => {
          if(i._id === e._id) {
            e.count = i.total
          }
        });
    });
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
  // getData() {
  //   this.familyService.getListFamily().subscribe((data=>{
  //     this.listFamily = data.message
  //     this.selection = this.listFamily[0]._id
  //   }))
  // }
  // savefamilyId() {
  //     localStorage.setItem('familyId', this.selection)

  // }
  // click() {
  //   console.log(this.selection)
  // }
}
