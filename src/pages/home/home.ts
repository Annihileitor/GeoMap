import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }
  ionViewDidLoad(){
    this.getPosition();
  }
  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
  
    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    // // Mensaje
    // var infoWindows = new google.maps.InfoWindows({
    //   content: 'Aquí estoy!!!'
    // });
    // // Mostramos el marcador en un mapa(this.map)
    // let marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: this.map,
    // });
    // // muestra el mensaje cuando seleccionas el marcador
    // marker.addListener('click', function(){
    //   infoWindows.open(this.map, marker);
    // });
    // google.maps.event.addListenerOnce(this.map, 'idle', () => {
      
    //   mapEle.classList.add('show-map');
    // });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }

}
