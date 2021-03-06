import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GeolocationService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  title = 'Maps';
  map: google.maps.Map;

  center: google.maps.LatLngLiteral = this.GeolocationService.centerService;

  infoWindows: any = [];

  markers: any = []

  mapMarker: any;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  constructor(
    public platform: Platform,
    private GeolocationService: GeolocationService,
  ) { }

  ngOnInit() {
    this.title = "maps"
    this.GeolocationService.getCurrentLocation();
  }

  ionViewWillEnter() {
    this.center = this.GeolocationService.centerService;
    this.initMap();
  }

  ngAfterViewInit() {
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.center,
      zoom: 15,
      disableDefaultUI: true,
    });
    this.addDataMarkerToMap();
  }

  getCurrentLocation() {
    this.GeolocationService.getCurrentLocation();
    this.center = this.GeolocationService.centerService;
    this.initMap();
    // this.addCurrenMarker();
  }

  addCurrenMarker() {
    let currentMarker = new google.maps.Marker({
      position: new google.maps.LatLng(this.center.lat, this.center.lng),
      label: 'Vị trí của bạn, kéo thả để thay đổi',
      icon: 'assets/icon/current-marker.png',
      draggable: true,
    });
    currentMarker.setMap(this.map);
    this.getCurrentMarkerLatLng(currentMarker, this.center.lat, this.center.lng);
  }

  getCurrentMarkerLatLng(currentMarker, lat, lng) {
    google.maps.event.addListener(currentMarker, 'dragend', function (event) {
      lat = event.latLng.lat();
      lng = event.latLng.lng();
    });
  }

  addDataMarkerToMap() {
    // this.parishesService.getAllWithDioceseId(this.pageRequestParishes).subscribe(data => {
    //   this.markers = data.parishes;
    //   this.deleteMapMarkers(this.markers);
    //   this.addMarkersToMap(this.markers);
    // })
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let distance: any = this.GeolocationService.distanceFromUserToPoint(this.center.lat, this.center.lng, marker.location.lat, marker.location.long);
      let tempUnit = ' km';
      if (distance < 1) {
        distance = this.GeolocationService.distanceFromUserToPointMet(this.center.lat, this.center.lng, marker.location.lat, marker.location.long).toFixed();
        tempUnit = ' m';
      }
      distance = distance + tempUnit;
      let position = new google.maps.LatLng(marker.location.lat, marker.location.long);
      this.mapMarker = new google.maps.Marker({
        position: position,
        label: marker.name,
        icon: 'assets/icon/map.png',
      });
      let mapMarkerInfo = {
        name: marker.name,
        url: marker.thumb_image.url,
        priest_name: marker.priest_name,
        address: marker.address,
        distance: distance,
        lat: marker.location.lat,
        lng: marker.location.long,
      }
      this.mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(this.mapMarker, mapMarkerInfo);
    }
  }

  deleteMapMarkers(mapMarkers) {
    // mapMarkers.setMap(null);
    mapMarkers = null
  }

  async addInfoWindowToMarker(marker, mapMarkerInfo) {
    let infoWindowContent =
      '<div *ngIf=" markers.length != null ">' +
      '<h3 style=" display: block; text-align: center; ">' + mapMarkerInfo.name + '</h3>' +
      '<img style=" height: 120px; width: 100%; display: block; margin: auto; border-radius: 12px; " src=' + mapMarkerInfo.url + '>' +
      '<h5 style=" display: block; text-align: center; font-size: 17px; ">' + mapMarkerInfo.priest_name + '</h5>' +
      '<h6>' + mapMarkerInfo.address + '</h6>' +
      '<p>Khoảng cách ước tính: ' + mapMarkerInfo.distance +
      '<ion-button id="navigate" mode="ios" style=" --background: #F6C33E; --border-radius: 15px; display: block; margin: auto; margin-top: 5px; --background-activated: #CC9D3E; ">' + 'Chỉ đường tới đây' + '</ion-button>'
    '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + mapMarkerInfo.lat + ',' + mapMarkerInfo.lng);
        });
      });

    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

}
