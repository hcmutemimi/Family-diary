
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { LoadingService, ToastService } from 'src/app/@app-core/utils'
import { FamilyMemberService } from '../@app-core/@http-config'
import { IDataNoti, PageNotiService } from '../@app-core/@modular/page-noti/page-noti.service'
import { PATTERN } from './../@app-core/@http-config'

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {
  formSubmit: FormGroup
  check = false
  message = ''
  checkpn = false
  messagepn = ''
  count: any
  dataReceive
  query

  validationSignUp = {
    name: [
      { type: 'required', message: 'The field is not empty' },
    ],
    relationship: [
      { type: 'required', message: 'The field is not empty' },
    ],
    email: [
      { type: 'required', message: 'The field is not empty' },
      { type: 'pattern', message: 'Email is Invalid' },
    ],
  }
  constructor(
    private formBuilder: FormBuilder,
    private loadService: LoadingService,
    private passwordModal: ModalController,
    private familyService: FamilyMemberService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private pageNotiService: PageNotiService,
    private router: Router
  ) {
    this.formSubmit = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
      relationship: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.query = this.route.queryParams.subscribe(params => {
      this.dataReceive = JSON.parse(params['data'])
    })
  }
  ionViewWillLeave() {
    this.query.unsubscribe()
  }
  onSubmit() {
    const relationship = this.formSubmit.value.relationship
    const email = this.formSubmit.value.email
    const name = this.formSubmit.value.name
    const datapasing: IDataNoti = {
      title: 'SUCCESSFUL!',
      des: 'Invited successfully!',
      routerLink: '/home'
    }
    var params = {
      email: email,
      familyId: this.dataReceive._id,
      relationship: relationship,
      name: name,
      role: ""
    }
    this.loadService.present()

    this.familyService.addMember(params).subscribe(data => {
      this.pageNotiService.setdataStatusNoti(datapasing)
      this.router.navigateByUrl('/page-noti')
      // this.toastService.present('Invited member successfully!')
      this.loadService.dismiss()
      this.passwordModal.dismiss()
    },
      (error) => {
        throw error
      })
  }
  dismissModal() {
    this.passwordModal.dismiss();
  }

}

