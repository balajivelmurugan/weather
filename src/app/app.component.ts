import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface WeatherReport {
  cityName?: string;
  weatherDesc?: string;
  temperature?: number;
}

@Pipe({name: 'celsius'})
export class ConvertToCelsiusPipe implements PipeTransform {
  transform(value: number): number {
    value = (value - 30) / 2;
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Weather';
  selectedValue: string = '';
  locations: Array<string> = ['London', 'Wales', 'York'];
  weatherData : WeatherReport = {};
  dataSource: Array<WeatherReport> = [];
  data: MatTableDataSource<WeatherReport> = new MatTableDataSource<WeatherReport>([]);
  displayedColumns: Array<string> = ['cityName', 'weatherDesc', 'temperature'];
  constructor(public http: HttpClient){
    
  }

  ngOnInit(){
    
  }

  getWeatherReport(): void{
    this.weatherData = {};
    console.log(this.selectedValue);
    this.http.get<object>(`http://api.openweathermap.org/data/2.5/weather?q=${this.selectedValue}&appid=e01ccf7c2cc5c3024da6187e40264dc6`).subscribe((response: any) => {
      console.log(response);
      this.data.data = [];
      this.weatherData.cityName = response?.name as string;
      this.weatherData.temperature = response?.main?.temp as number;
      this.weatherData.weatherDesc = response?.weather[0]?.description as string;
      console.log(this.weatherData);
      this.dataSource.push(this.weatherData);
      console.log(this.dataSource);
      this.data.data = this.dataSource;
    }, error => {
      console.log(error);
    })
  }
}
