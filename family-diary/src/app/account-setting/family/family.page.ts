import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/@app-core/@http-config/family/family.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
})
export class FamilyPage implements OnInit {
  listFamily
  constructor(
    public familyService: FamilyService
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData() {
    this.familyService.getListFamily().subscribe((data=>{
      this.listFamily = data.message
      console.log(this.listFamily)
    }))
  }
}
