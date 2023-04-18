import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/colorModel/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = 'https://localhost:44393/api/colors/'

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newUrl = this.apiUrl + 'getall'
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  add(color:Color):Observable<ResponseModel>{
    let newUrl = this.apiUrl + 'add'
    return this.httpClient.post<ResponseModel>(newUrl,color);
  }
}
