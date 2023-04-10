import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rentalModel/rental';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44393/api/rentals'
  constructor(private htppClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newUrl = this.apiUrl + "/getrentaldetails"
    return this.htppClient.get<ListResponseModel<Rental>>(newUrl)
  }

  add(rental:Rental):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "/add"
    return this.htppClient.post<ResponseModel>(newUrl, rental)
  }
}
