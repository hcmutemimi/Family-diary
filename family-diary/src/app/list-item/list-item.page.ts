import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventService } from '../@app-core/@http-config';
import { ToastService } from '../@app-core/utils';
import { ModalAddTodoPage } from '../modal-add-todo/modal-add-todo.page';
import { ToDoDetailPage } from '../to-do/to-do-detail/to-do-detail.page';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.page.html',
  styleUrls: ['./list-item.page.scss'],
})
export class ListItemPage implements OnInit {
  formAddToDo: FormGroup

  headerCustom = {
    title: 'VIEW LIST', background: '#00B0B2', back: true
  }
  listToDo = []
  dataReceive
  param
  for
  text
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toarstService: ToastService,
    private router: Router,
    private eventService: EventService,

    private modal: ModalController

  ) {
    this.formAddToDo = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dataReceive = JSON.parse(params['data'])
      this.param = this.dataReceive?.paramAdd
      this.for = this.dataReceive?.for
      this.listToDo = this.dataReceive.list?.metaData
      this.text = this.for == 'detail' ? 'NEXT' : 'DONE'
    })
  }
  addItem() {
    if (this.listToDo == null) {
      this.listToDo = []
    }
    this.listToDo.push({
      name: this.formAddToDo.get('name').value,
      check: false
    })
    this.formAddToDo.get('name').setValue('')
  }
  removeItem(item) {
    this.listToDo.splice(item, 1)
  } 
  changeStatus(item) {
    item.check = item.check? false: true 
  }

  submitEvent() {
    if (this.for == 'add') {
      this.param['metaData'] = this.listToDo
      this.eventService.createEvent(this.param).subscribe(data => {
        this.toarstService.present('Create new to-do successfully!')
        this.router.navigateByUrl('/to-do')
      },
        () => {
          this.toarstService.present('Please check again!') 
        })
    } else {
      let request = {
        metaData: this.listToDo
      }
      this.dataReceive.list.meteData = this.listToDo
      this.eventService.updateMetaDataEvent(this.dataReceive?.list?._id, request).subscribe(data => {
      })
      this.addList(this.dataReceive.list._id)

    }

  }
  async addList(id) {
    const modal = await this.modal.create({
      component: ToDoDetailPage,
      swipeToClose: true,
      cssClass: 'modal__addToDo',
      componentProps: { title: 'UPDATE LIST', id: id }
    })
    await modal.present()
  }
}
