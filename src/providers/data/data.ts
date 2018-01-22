import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

 
@Injectable()
export class DataProvider {

  weather: any;
  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

 
  getWeatherData(loc) {
    if (this.weather) {
      return Promise.resolve(this.weather);
    }
    return new Promise(resolve => {  
      this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+loc.lat+'&lon='+loc.lng+'&units=metric&APPID=53f9d8e4213222cf517d86dc406d67fc')
        .subscribe(data => {
          this.weather = data;
          resolve(this.weather);
        });
    });
  }

}
