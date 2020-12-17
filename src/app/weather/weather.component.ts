import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myDate = Date.now();
  myDate2 = Date.now() + 24 * 60 * 60 * 1000;
  myDate3 = Date.now() + (24 * 60 * 60 * 1000)*2;
  myDate4 = Date.now() + (24 * 60 * 60 * 1000)*3;
  myDate5 = Date.now() + (24 * 60 * 60 * 1000)*4;
  myDate6 = Date.now() + (24 * 60 * 60 * 1000)*5;
  myDate7 = Date.now() + (24 * 60 * 60 * 1000)*6;

  myDate8 = Date.now() - (24 * 60 * 60 * 1000);
  myDate9 = Date.now() - (24 * 60 * 60 * 1000)*2;
  myDate10 = Date.now() - (24 * 60 * 60 * 1000)*3;
  myDate11 = Date.now() - (24 * 60 * 60 * 1000)*4;

  dateMinus1 = Math.round(this.myDate8 / 1000);
  dateMinus2 = Math.round(this.myDate9 / 1000);
  dateMinus3 = Math.round(this.myDate10 / 1000);
  dateMinus4 = Math.round(this.myDate11 / 1000);

  WeatherData:any;
  futureTemperature: any;
  pastTemperature: any;
  pastHumidity: any;
  location: string;
  longitude: number;
  latitude: number;
  isSearchSuccessful: boolean;

  urlIconToday = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_plus1 = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_plus2 = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_plus3 = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_plus4 = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_plus5 = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_plus6 = "http://openweathermap.org/img/wn/03d@2x.png";

  urlIconToday_minus1 = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_minus2 = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_minus3 = "http://openweathermap.org/img/wn/03d@2x.png";
  urlIconToday_minus4 = "http://openweathermap.org/img/wn/03d@2x.png";

  public hour: any;
  public minute: string;
  public second: string;
  public ampm: string;

  constructor() { }


  ngOnInit(){
    //console.log(this.dateMinus1);
    //console.log(this.dateMinus2);
    //console.log(this.dateMinus3);
    //console.log(this.dateMinus4);
    setInterval(() => {
      const clock = new Date();
      this.digitalclock(clock);
    }, 1000);

    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.futureTemperature = [-1, -1, -1, -1, -1, -1];
    this.pastTemperature = [-1, -1, -1, -1];
    this.pastHumidity = [-1, -1, -1, -1];
    this.latitude = 6.2088;
    this.longitude = 106.8456;
    //document.getElementById("submitLocation").addEventListener("click",
    //function(event){
    //  event.preventDefault();
    //});
    this.location = "Jakarta";
    this.getWeatherData();
    this.getPastWeatherData();
    // console.log(this.WeatherData);
    // console.log(this.myDate);
  }

  digitalclock(clock: Date){

    const hours = clock.getHours();
    
    this.ampm = hours >= 12 ? 'PM' : 'AM';

    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = clock.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    const seconds = clock.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=6.2088&lon=106.8456&exclude=minutely,hourly,alerts&appid=75f224a9280b9d612de738569c117dbb')
    //fetch('https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=75f224a9280b9d612de738569c117dbb')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  getWeatherDataFromForm(location: HTMLInputElement){
    // alert(location.value);
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location.value + '&appid=75f224a9280b9d612de738569c117dbb')
    .then(response=>response.json())
    .then(data=>{this.getCoordinate(data);})
  }

  getCoordinate(data){
    if (data.cod == 200){
      this.latitude = data.coord.lat;
      this.longitude = data.coord.lon;
      this.location = data.name;
      this.getWeatherData2();
      this.getPastWeatherData();
    }
    else{
      alert("Location Not Found");
    }
  }

  getWeatherData2(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.latitude + '&lon=' + this.longitude + '&exclude=minutely,hourly,alerts&appid=75f224a9280b9d612de738569c117dbb')
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data);})
  }

  getPastWeatherData(){
    this.pastTemperature = [-1, -1, -1, -1];
    this.pastHumidity = [-1, -1, -1, -1];
    this.urlIconToday_minus1 = "http://openweathermap.org/img/wn/03d@2x.png";
    this.urlIconToday_minus2 = "http://openweathermap.org/img/wn/03d@2x.png";
    this.urlIconToday_minus3 = "http://openweathermap.org/img/wn/03d@2x.png";
    this.urlIconToday_minus4 = "http://openweathermap.org/img/wn/03d@2x.png";
    this.getPastWeatherData1();
  }

  getPastWeatherData1(){
    fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + this.latitude + '&lon=' + this.longitude + '&dt=' + this.dateMinus4 + '&appid=6781d6572766dc79429c5aee73ecf7e7')
    .then(response=>response.json())
    .then(data=>{this.setPastWeatherData(data, 0);
      this.getPastWeatherData2();
    })
  }

  getPastWeatherData2(){
    fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + this.latitude + '&lon=' + this.longitude + '&dt=' + this.dateMinus3 + '&appid=6781d6572766dc79429c5aee73ecf7e7')
    .then(response=>response.json())
    .then(data=>{this.setPastWeatherData(data, 1);
      this.getPastWeatherData3();
    })
  }

  getPastWeatherData3(){
    fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + this.latitude + '&lon=' + this.longitude + '&dt=' + this.dateMinus2 + '&appid=6781d6572766dc79429c5aee73ecf7e7')
    .then(response=>response.json())
    .then(data=>{this.setPastWeatherData(data, 2);
      this.getPastWeatherData4();
    })
  }

  getPastWeatherData4(){
    fetch('https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + this.latitude + '&lon=' + this.longitude + '&dt=' + this.dateMinus1 + '&appid=6781d6572766dc79429c5aee73ecf7e7')
    .then(response=>response.json())
    .then(data=>{this.setPastWeatherData(data, 3);})
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    //let sunsetTime = new Date(this.WeatherData.current.sunset * 1000);
    //this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    //let currentDate = new Date();
    //this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.current.temp - 273.15).toFixed(1);
    this.futureTemperature[0] = (this.WeatherData.daily[1].temp.day - 273.15).toFixed(1);
    this.futureTemperature[1] = (this.WeatherData.daily[2].temp.day - 273.15).toFixed(1);
    this.futureTemperature[2] = (this.WeatherData.daily[3].temp.day - 273.15).toFixed(1);
    this.futureTemperature[3] = (this.WeatherData.daily[4].temp.day - 273.15).toFixed(1);
    this.futureTemperature[4] = (this.WeatherData.daily[5].temp.day - 273.15).toFixed(1);
    this.futureTemperature[5] = (this.WeatherData.daily[6].temp.day - 273.15).toFixed(1);
    //this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    //this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    //this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.current.wind_speed = (this.WeatherData.current.wind_speed).toFixed(0);

    this.urlIconToday = "http://openweathermap.org/img/wn/" + this.WeatherData.current.weather[0].icon + "@2x.png";
    this.urlIconToday_plus1 = "http://openweathermap.org/img/wn/" + this.WeatherData.daily[1].weather[0].icon + "@2x.png";
    this.urlIconToday_plus2 = "http://openweathermap.org/img/wn/" + this.WeatherData.daily[2].weather[0].icon + "@2x.png";
    this.urlIconToday_plus3 = "http://openweathermap.org/img/wn/" + this.WeatherData.daily[3].weather[0].icon + "@2x.png";
    this.urlIconToday_plus4 = "http://openweathermap.org/img/wn/" + this.WeatherData.daily[4].weather[0].icon + "@2x.png";
    this.urlIconToday_plus5 = "http://openweathermap.org/img/wn/" + this.WeatherData.daily[5].weather[0].icon + "@2x.png";
    this.urlIconToday_plus6 = "http://openweathermap.org/img/wn/" + this.WeatherData.daily[6].weather[0].icon + "@2x.png";
  }

  setPastWeatherData(data: any, index: number){
    this.pastTemperature[index] = (data.current.temp - 273.15).toFixed(1);
    this.pastHumidity[index] = data.current.humidity;
    
    if(index == 0){
      this.urlIconToday_minus4 = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    }else if(index == 1){
      this.urlIconToday_minus3 = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    }else if(index == 2){
      this.urlIconToday_minus2 = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    }else if(index == 3){
      this.urlIconToday_minus1 = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    }
  }
  
}