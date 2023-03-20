import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from 'src/app/models/rentalModel/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44393/api/rentals/getrentaldetails'
  constructor(private htppClient:HttpClient) { }

  getRentals():Observable<RentalResponseModel>{
    return this.htppClient.get<RentalResponseModel>(this.apiUrl)
  }
}
