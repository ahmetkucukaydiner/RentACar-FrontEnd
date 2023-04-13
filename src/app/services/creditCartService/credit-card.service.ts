import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCardModel/creditCardModel';
import { EntityResponseModel } from 'src/app/models/entityResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:44393/api/creditcards/'

  constructor(private httpClient:HttpClient) { }

  getById(id:number):Observable<EntityResponseModel<CreditCard>>{
    let newUrl = this.apiUrl + "getbyid?id=" + id
    return this.httpClient.get<EntityResponseModel<CreditCard>>(newUrl);
  }
}
