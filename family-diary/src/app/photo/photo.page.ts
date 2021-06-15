import { Component, OnInit } from '@angular/core';
import { PostService } from '../@app-core/@http-config/post';
import { CameraService } from '../@app-core/utils/camera.service';
import * as moment from 'moment';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  headerCustom = {
    background: '#474747', title: 'SHARING PHOTOS ^_^', color: '#E7E7E7', back: true
  }
  show = false
  familyId
  dataPost
  constructor(
    private imageService: PostService,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    this.getData()
    this.familyId = localStorage.getItem('familyId')
  }
  getUrl(item) {
    return `url("${item.url}")`
  }
  getData() {
    let param = {
      familyId: localStorage.getItem('familyId')
    }
    this.imageService.getImage(param).subscribe(data =>{
      this.dataPost = data.message
      console.log(this.dataPost)
      this.dataPost = this.dataPost.sort(function (a, b) {
        return new Date(b.mDate).getTime() - new Date(a.mDate).getTime()
      })
      this.dataPost.forEach(i => {
        if(i.userId.avatar == null) {
          i.userId.avatar = 'assets/img/avatar.png'
        }
      });
    })
  }
  toggleClick() {
    this.show = !this.show
  }
  formatDate(value) {
    return moment(new Date(value)).fromNow()
  }
  openLibrary() {
    this.cameraService.postImage(this.familyId)
    this.getData()
    
  }
  takePhoto() {
    this.cameraService.takeImage(this.familyId)
    this.getData()
  }
}
