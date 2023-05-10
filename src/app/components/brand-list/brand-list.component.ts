import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brandModel/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: Brand[] = []

  constructor(private brandService:BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
}
