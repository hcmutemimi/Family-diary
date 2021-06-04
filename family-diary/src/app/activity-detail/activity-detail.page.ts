import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { FamilyMemberService } from 'src/app/@app-core/@http-config';
import { HistoryService } from 'src/app/@app-core/@http-config/history';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  familyMemberId
  param: any
  flag = false
  listHistory = []
  listHistoryFinal = []
  headerCustom = {
    background: '#43bf6a', title: 'ACTIVITIES HISTORY', color: '#fff'
  }

  constructor(
    private familyMemberService: FamilyMemberService,
    private route: ActivatedRoute,
    private history: HistoryService,
    private router: Router
  ) { }
  ngOnInit() {
    this.param = {
      familyMemberId: localStorage.getItem('idFM')
    }
    if(!this.flag) {
      this.familyMemberService.updateHistory(this.param).subscribe(data =>{
        this.flag = true
      })
    }
   
    this.getDataHistory()
  }
  
  getDataHistory(){
    let param2 = {
      familyId: localStorage.getItem('familyId')
    }
      this.history.getAll(param2).subscribe(data =>{
        this.listHistory = data.message
        this.handleDate(this.listHistory)
          this.handle(this.listHistory,'cutDate', this.listHistoryFinal)
      })
  }
  handleDate(list) {
    list.forEach(item => {
      if(item.objectName == 'to-do') {
        item['img'] = 'assets/img/menu/todo.svg'
        item['colorCode'] = '#00B0B2'
      }else if(item.objectName == 'list-to-do') {
        item['colorCode'] = '#00B0B2'
        item['img'] = 'assets/img/list-to-do.svg'
      }else {
        item['colorCode'] = '#FD7160'
        item['img'] = 'assets/img/menu/event.svg'
      }
      item['cutDate'] = item.updatedAt.slice(0, 10)
    })
  }
  handle(list, param, final) {
    let handle = list.map(item => item[param])
    handle = [...new Set(handle)]
    handle.forEach(i => {
      const result = list.filter(item => {
        return item[param] === i
      })
      final.push(result)
    })
  }
  goToDestine(item) {
    if(item.objectName == 'todo' || item.objectName == 'list-to-do') {
      this.router.navigateByUrl('to-do')
    }else  {
        this.router.navigateByUrl('event')
    }
  }

}
