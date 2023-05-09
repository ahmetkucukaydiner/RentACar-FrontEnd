import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brandModel/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { EntityResponseModel } from 'src/app/models/entityResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44393/api/brands/'

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newUrl = this.apiUrl +  'getall'
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  add(brand:Brand) : Observable<ResponseModel>{
    let newUrl = this.apiUrl +  'add'
    return this.httpClient.post<ResponseModel>(newUrl, brand)
  }

  getByBrandId(id:number) : Observable<EntityResponseModel<Brand>>{
    let newUrl = this.apiUrl + 'getbybrandid?id=' + id
    return this.httpClient.get<EntityResponseModel<Brand>>(newUrl);
  }

  update(brand:Brand) : Observable<ResponseModel>{
    let newUrl = this.apiUrl +  'update'
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

  delete(brand:Brand) : Observable<ResponseModel>{
    let newUrl = this.apiUrl + 'delete'
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }
}
