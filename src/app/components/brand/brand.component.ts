import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brandModel/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;
  currentBrand: Brand ;
  defaultBrand: Brand ;
  filterText = "";

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  clearCurrentBrand() {
    this.currentBrand = this.defaultBrand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand)
    {
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
  getAllBrandClass(){
    if(!this.currentBrand)
    {
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
