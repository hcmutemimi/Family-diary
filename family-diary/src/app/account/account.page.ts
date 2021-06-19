import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController, ModalController, PopoverController } from '@ionic/angular'
import { AccountService, PATTERN } from './../@app-core/@http-config'
import { LoadingService, ToastService } from '../@app-core/utils'
import { ChangepasswordPage } from '../changepassword/changepassword.page'
import { CameraService } from '../@app-core/utils/camera.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  avatar = ''
  headerCustom = { title: 'INFORMATION' }
  activatedInput = false
  loadedData = false
  form: FormGroup

  lastForm = {}
  isUpdating = false

  validationMessages = {
    full_name: [
      { type: 'required', message: 'Name is required.' }
    ],
    phone_number: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Phone number is invalid.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email is invalid.' },
    ],
  }

  constructor(
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private accountService: AccountService,
    private passwordModal: ModalController,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private alertCtrl: AlertController,
    private cameraService: CameraService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.loadingService.present()
    this.initForm()
    this.getData()

  }
  ngDoCheck() {
    this.avatar = localStorage.getItem('avatar')
    if(this.avatar == 'null') {
      this.avatar = 'assets/img/avatar.png'
    }
  }
  ionViewWillEnter() {
    this.avatar = localStorage.getItem('avatar')
    if(this.avatar == 'null') {
      this.avatar = 'assets/img/avatar.png'
    }
  }

  initForm() {
    this.form = this.fb.group({
      avatar: new FormControl(''),
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      birthday: new FormControl(''),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM_FULL)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
    })
  }

  async avatarSetting() {
    let alertAvatarSetting = await this.alertCtrl.create({
      message: 'Setting your photo',
      mode: 'ios',
      buttons: [
        {
          text: "Choose from libray",
          handler: () => {
            this.cameraService.getAvatarUpload()
          
          }
        },
        {
          text: "Take photo",
          handler: () => {
            this.cameraService.getAvatarTake()
          }
        },
        {
          text: 'Remove current photo',
          handler: () => {
            this.cameraService.removeAvatar()
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
        },
      ]
    })
    await alertAvatarSetting.present()
  }
  gotoMain() {
    this.router.navigateByUrl('/home')
  }
  async openModalPassword() {
    const popover = await this.passwordModal.create({
      component: ChangepasswordPage,
      cssClass: 'modalPassword',
    })
    return await popover.present()
  }

  activateInput() {
    this.activatedInput = true
    this.lastForm = this.form.value
  }
  deactivateInput() {
    this.activatedInput = false
    this.form.patchValue(this.lastForm)
  }

  getData() {
    this.accountService.getAccount().subscribe(data => {
      this.form.patchValue(data.user)
      this.loadedData = true
      this.loadingService.dismiss()
    })
  }

  updateInfo() {
    this.loadingService.present()
    let data = this.form.value
    this.accountService.updateProfile(data).subscribe((data) => {
      localStorage.setItem('name', data.lName)
      this.activatedInput = false
      this.loadingService.dismiss()
      this.toastService.present('Updated Successfully !')
    })
  }

  canUpdate() {
    return JSON.stringify(this.lastForm) !== JSON.stringify(this.form.value) && this.form.valid
  }

}

