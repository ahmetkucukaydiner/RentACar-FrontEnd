import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, RepeatConfig } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Car } from 'src/app/models/carModel/car';
import { EntityResponseModel } from 'src/app/models/entityResponseModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44393/api/'

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarById(Id: number) :Observable<EntityResponseModel<Car>>{
    let newPath =  this.apiUrl + "cars/getbyid?id=" + Id
    return this.httpClient.get<EntityResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandAndColor(brandId:number, colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbybrandandcolorid?brandid=" + brandId + "&colorid=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add"
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
}
