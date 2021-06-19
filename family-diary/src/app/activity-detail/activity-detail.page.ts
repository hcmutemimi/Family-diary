import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FamilyMemberService } from 'src/app/@app-core/@http-config';
import { HistoryService } from 'src/app/@app-core/@http-config/history';
import { LoadingService } from '../@app-core/utils';
import { ToDoDetailPage } from '../to-do/to-do-detail/to-do-detail.page';

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
    background: '#43bf6a', title: 'ACTIVITIES HISTORY', color: '#fff', back: true
  }

  constructor(
    private familyMemberService: FamilyMemberService,
    private route: ActivatedRoute,
    private history: HistoryService,
    private router: Router,
    private modal: ModalController,
    private loadingService: LoadingService
  ) { }
  ngOnInit() {
    this.loadingService.present()
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
        this.loadingService.dismiss()
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
      }else if(item.objectName == 'upload') {
        item['colorCode'] = '#42B245'
        item['img'] = 'assets/img/camera-green.svg'
      } else {
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
  async goToDestine(item) {
    if(item.objectName == 'to-do' && item.typeChange =='New' || item.objectName =='list-to-do') {
      this.router.navigateByUrl('to-do')
    }else if(item.objectName == 'to-do' && item.typeChange =='Updated') {
      const modal = await this.modal.create({
        component: ToDoDetailPage,
        swipeToClose: true,
        cssClass: 'modal__addToDo',
        componentProps: { title: 'Detail To Do', id: item.objectId  }
      })
      await modal.present()
    }
    else if(item.objectName == 'upload') {
        this.router.navigateByUrl('photo')
    }else {
      this.router.navigateByUrl('event')

    }
  }


}
