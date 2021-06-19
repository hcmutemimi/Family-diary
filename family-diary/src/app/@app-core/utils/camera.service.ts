import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { LoadingService, ToastService } from '.';
import { AccountService } from '../@http-config';
import { PostService } from '../@http-config/post';

@Injectable()
export class CameraService {
    constructor(
        public camera: Camera,
        public loadingService: LoadingService,
        public accountService: AccountService,
        public popoverController: PopoverController,
        public toastService: ToastService,
        private postService: PostService

    ) { }
    public getAvatarUpload() {
        this.loadingService.present('Please wait a minute...');
        const options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
        }
        this.camera.getPicture(options).then(async (dataUrl) => {
            if (dataUrl) {
                var dataUri = "data:image/jpeg;base64," + dataUrl;
                var image = this.dataURItoBlob(dataUri);
                let formData = new FormData;
                // formData.append('files[]', image);
                // API upload get url from cloudinary
                formData.append('photo', image);

                this.accountService.uploadPhoto(formData).subscribe((data) => {
                    //localStorage.setItem('avatar', data['data'][0])
                    //API upload get url from cloudinary
                    localStorage.setItem('avatar', data['message'])

                    this.accountService.updateAvatar({ avatar: data['message'] }).subscribe(data => {
                        this.loadingService.dismiss();
                        this.accountService.getAccount().subscribe();
                        this.toastService.present('Updated successfully !');
                    })

                })
            } 
        }).catch((err) => {
            this.loadingService.dismiss();
        })
    }
    public postImage(familyId) {
        this.loadingService.present('Please wait a minute...');
        const options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
        }
        this.camera.getPicture(options).then(async (dataUrl) => {
            if (dataUrl) {
                var dataUri = "data:image/jpeg;base64," + dataUrl;
                var image = this.dataURItoBlob(dataUri);
                let formData = new FormData;
                formData.append('photo', image)
                this.postService.uploadPhoto(formData).subscribe((data) => {
                    let param = {
                        familyId: familyId,
                        url: data['message']
                    }
                    this.postService.saveImage(param).subscribe(data => {
                        this.loadingService.dismiss()
                        this.toastService.present('Posted successfully !');

                    },
                    (error) =>{
                        throw error
                    })
                })
            }
        }).catch((err) => {
            this.loadingService.dismiss();
            throw err
        })
    }
    public takeImage(familyId) {
        this.loadingService.present('Please wait a minute...');
        const options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation: true
        }
        this.camera.getPicture(options).then(async (dataUrl) => {
            if (dataUrl) {
                var dataUri = "data:image/jpeg;base64," + dataUrl;
                var image = this.dataURItoBlob(dataUri);
                let formData = new FormData;
                formData.append('photo', image)
                this.postService.uploadPhoto(formData).subscribe((data) => {
                    let param = {
                        familyId: familyId,
                        url: data['message']
                    }
                    this.postService.saveImage(param).subscribe(data => {
                        this.loadingService.dismiss()
                        this.toastService.present('Posted successfully !');
                    },
                    (error) =>{
                        throw error
                    })
                })
            }
        }).catch((err) => {
            this.loadingService.dismiss()
            throw err
        })
    }
    public getAvatarTake() {
        this.loadingService.present('Please wait a minute...');
        const options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation: true
        }
        this.camera.getPicture(options).then(async (dataUrl) => {
            if (dataUrl) {
                var dataUri = "data:image/jpeg;base64," + dataUrl;
                var image = this.dataURItoBlob(dataUri);
                let formData = new FormData;
                formData.append('photo', image);
                this.accountService.uploadPhoto(formData).subscribe((data) => {
                    localStorage.setItem('avatar', data['message'])
                    this.accountService.updateAvatar({ avatar: data['message'] }).subscribe(data => {
                        this.loadingService.dismiss();
                        this.toastService.present('Updated sucessfully!');
                        this.accountService.getAccount().subscribe();

                    })
                })
            }
        }).catch((err) => {
            this.loadingService.dismiss();
            this.toastService.present('Not success, Please try again!');
            throw err
        })
    }
    removeAvatar() {
        this.loadingService.present('Please wait a minute...');
        this.accountService.updateAvatar({ avatar: null }).subscribe(
            (data: any) => {
                if (!localStorage.getItem('avatar')) {
                    localStorage.removeItem('avatar');
                    localStorage.setItem('avatar', 'https://i.imgur.com/edwXSJa.png')
                }
                else {
                    localStorage.setItem('avatar', 'https://i.imgur.com/edwXSJa.png')
                }
                this.loadingService.dismiss();
                this.toastService.present('Remove sucessfully !', 'top', 2000);
            },
            (error: any) => {
                this.loadingService.dismiss();
                if (error.error) {
                    this.toastService.present('Not success, Please try again !', 'top', 2000);
                }
            }
        )
    }
    dataURItoBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        }
        else {
            byteString = encodeURI(dataURI.split(',')[1]);
        }
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }
   
}