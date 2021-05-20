import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FamilyService } from '../@app-core/@http-config';
import { ToastService } from '../@app-core/utils';

@Component({
  selector: 'app-new-family',
  templateUrl: './new-family.page.html',
  styleUrls: ['./new-family.page.scss'],
})
export class NewFamilyPage implements OnInit {
  headerCustom = {
    title: 'CREATE NEW FAMILY', background: '#00B0B2'
  }
  formAddNewFamily: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private family: FamilyService,
    private toarstService: ToastService,
    private router: Router,
    private modal: ModalController
  ) {
    this.formAddNewFamily = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    })
   }

  ngOnInit() {

  }
  submit() {
    let param = {
      name: this.formAddNewFamily.get('name').value,
      relationship: ''
    }
    this.family.createFamily(param).subscribe((data)=>{
      this.toarstService.present('Create new family successfully!')
      this.router.navigateByUrl('/home')
      this.modal.dismiss()
    },
    (error)=>{
      this.toarstService.present('Please check again!')

    }
    )
  }

}
