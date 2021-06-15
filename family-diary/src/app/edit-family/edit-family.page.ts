import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FamilyService } from '../@app-core/@http-config';

@Component({
  selector: 'app-edit-family',
  templateUrl: './edit-family.page.html',
  styleUrls: ['./edit-family.page.scss'],
})
export class EditFamilyPage implements OnInit {
  formSubmit: FormGroup
  @Input() id: any
  @Input() check: any
  param
  constructor(
    private formBuilder: FormBuilder,
    private family: FamilyService,
    private modal: ModalController,
    
  ) {
    this.formSubmit = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    })
   }

  ngOnInit() {
    this.param =  {
      familyId: this.id
    }
    this.family.getById(this.param).subscribe(data =>{
      this.formSubmit.get('name').setValue(data.message.name)
    },
    (error) =>{
      throw error
    })
  
  }
  ionViewWillEnter() {
  
  }
  onSubmit() {
    let name = {
      name: this.formSubmit.get('name').value
    }
    this.family.updateFamily(this.id, name).subscribe(data =>{
      if(this.check == true) {
        console.log(1)
        localStorage.setItem('nameFamily', this.formSubmit.get('name').value)
      }
      this.modal.dismiss()
    },
    (error) =>{
      throw error
    })
  }
  dismissModal() {
    this.modal.dismiss()
  }

}
