import {Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';


declare var google;  //declara un espacio de memoria con la variable google

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit { // se implementa el metodo onInit

    @ViewChild('map') mapElement: ElementRef;

  map;

  constructor(private geo: Geolocation) {}

  ngOnInit() {
    this.initMap(); // llama al metodo initMap para iniciar el mapa
  }

   async initMap() {
        let latlng;
       await this.geo.getCurrentPosition().then((resp: any) => {
             latlng = {lat: resp.coords.latitude, lng: resp.coords.longitude };
        }).catch((error) => {
            console.log('Error getting location', error);
        });
       console.log(latlng);
     this.map = new google.maps.Map(document.getElementById('map'), {
          center: latlng,
          zoom: 8
      });

       let marker = new google.maps.Marker(
           {
               position: latlng,
               map: this.map
           });
  }

}
