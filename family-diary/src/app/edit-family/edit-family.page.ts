import { Component, OnInit } from '@angular/core';
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
  param
  constructor(
    private formBuilder: FormBuilder,
    private family: FamilyService,
    private modal: ModalController
  ) {
    this.formSubmit = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    })
   }

  ngOnInit() {
    this.param =  {
      familyId: localStorage.getItem('familyId')
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
    this.family.updateFamily(localStorage.getItem('familyId'), name).subscribe(data =>{
      console.log(data)
      this.modal.dismiss()
    },
    (error) =>{
      throw error
    })
  }

}
