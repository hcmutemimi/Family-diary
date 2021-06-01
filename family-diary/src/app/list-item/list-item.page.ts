import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../@app-core/@http-config';
import { ToastService } from '../@app-core/utils';

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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toarstService: ToastService,
    private router: Router,
    private eventService: EventService,

  ) {
    this.formAddToDo = this.formBuilder.group({
      name: new FormControl('',Validators.compose([
        Validators.required,
      ]) ) 
    })
   }
 
  ngOnInit() {
    this.listToDo = []
    this.route.queryParams.subscribe(params =>{
      this.dataReceive = JSON.parse(params['data'])
    })
  }
  addItem() {
   this.listToDo.push({
      name: this.formAddToDo.get('name').value,
      check: false
    })
    this.formAddToDo.get('name').setValue('')
  }
  removeItem(item) {
   this.listToDo.splice(item,1)
  }
  submitEvent()  {
    this.dataReceive['metaData'] = this.listToDo
    this.eventService.createEvent(this.dataReceive).subscribe(data => {
      this.toarstService.present('Create new to-do successfully!')
      this.router.navigateByUrl('/to-do')
    },
      (error) => {
        throw error
      })
  }
}
