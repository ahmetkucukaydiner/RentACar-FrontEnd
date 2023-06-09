import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/carImageModel/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44393/"

  constructor(private httpClient:HttpClient) { }

  getCarImages(): Observable<ListResponseModel<CarImage>>{
    let newPath= this.apiUrl + "api/carimages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getCarImagesByCarId(carId:number) : Observable<ListResponseModel<CarImage>>{
    let newPath= this.apiUrl + "api/carimages/getbycarid?carid=" + carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getImagePath(carImage:string) : Observable<ListResponseModel<CarImage>>{
    let newPath =  this.apiUrl + "uploads/images=" +carImage
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

}
