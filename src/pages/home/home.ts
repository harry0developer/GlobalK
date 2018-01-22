import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  options: any;
  location: any;
  weatherData: any;
  loader: any;
  constructor(private geolocation: Geolocation, private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, private dataProvider: DataProvider) {
    this.location = {};
    this.weatherData = null;
  }

  ionViewDidLoad(){
    this.getLocation();
  }

  getLocation(){
    this.presentLoading("Please wait...");
    this.geolocation.getCurrentPosition().then((resp) => { 
      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;
      this.dataProvider.getWeatherData(this.location).then(res => {
        console.log(res);
        this.weatherData = res;
        this.dismissLoading();
      }).catch(err => {
        console.log(err);
       this.showAlert("Weather error", err);
       this.dismissLoading();
      })
    }).catch((error) => {
      console.log(error);
      this.showAlert("Location error,", error.message)
      this.dismissLoading();
    });
    
  }
  showAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  refresh(){
    this.location = {};
    this.weatherData = null;
    this.getLocation();
  }

  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

  dismissLoading(){
    this.loader.dismiss();
  }

  roundUp(dig){
    return Math.round(dig);
  }
    
}
