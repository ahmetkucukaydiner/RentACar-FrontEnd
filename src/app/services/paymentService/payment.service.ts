import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Payment } from 'src/app/models/paymentModel/payment';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44393/api/payments'

  constructor(private httpClient:HttpClient) { }

  getPayments():Observable<ListResponseModel<Payment>>{
    let newUrl = this.apiUrl + "/getall"
    return this.httpClient.get<ListResponseModel<Payment>>(newUrl);
  }

  add(pay:Payment):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "/pay"
    return this.httpClient.post<ResponseModel>(newUrl,pay)
  }
}
