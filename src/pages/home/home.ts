import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  public marker: any;
  
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public http: Http) {
    // setInterval(() => { this.getPositionCurrent(); }, 1000);
  }
  ionViewDidLoad(){
    this.getPosition();
    this.setMap(); 
  
  }
  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {  
        this.loadMap(response); 
        
    })
    
  }
  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
  
    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 17
    });
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
         this.marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map
        });
        // console.log(myLatLng);
      
      
      mapEle.classList.add('show-map');
    });
  }
  setMap(){
    this.geolocation.watchPosition().subscribe(res => {  
      let myLatLng = {lat: res.coords.latitude, lng: res.coords.longitude};
      this.setMyMap(myLatLng, this.map, this.marker);
    })
  }
  setMyMap(latLng, map, marker) {

    if (marker) {
      // console.log('setnullmap:'+marker)
      marker.setMap(null);
      this.marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    }
    
    map.setCenter(latLng);
    map.panTo(latLng);
    // console.log(latLng);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    this.http.post('http://localhost:8080/api/test', JSON.stringify(latLng), {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
    });

  }
}
