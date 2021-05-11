import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/@app-core/@http-config/family/family.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
})
export class FamilyPage implements OnInit {
  listFamily
  selection
  constructor(
    public familyService: FamilyService
  ) { }

  ngOnInit() {
    // this.getData()
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
