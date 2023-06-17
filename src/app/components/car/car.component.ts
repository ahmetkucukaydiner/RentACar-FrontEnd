import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brandModel/brand';
import { CarDetail } from 'src/app/models/carDetailModel/carDetail';
import { Car } from 'src/app/models/carModel/car';
import { Color } from 'src/app/models/colorModel/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  dataLoaded = false;
  cars: Car[] = [];
  currentCar: Car;
  imageUrl = "https://localhost:44393/Uploads/Images/" ;
  carDetails:CarDetail;
  brands: Brand[] = []
  colors: Color[] = []
  carFilter= "";
  brandFilter:number=0;
  colorFilter:number=0;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const brandId = params['brandId'];
      const colorId = params['colorId'];

      if (brandId && colorId) {
        this.getCarsByBrandAndColorId(brandId, colorId);
      } else if (brandId) {
        this.getCarsByBrandId(brandId);
      } else if (colorId) {
        this.getCarsByColorId(colorId);
      } else {
        this.getCars();
        this.getBrands();
        this.getColors();
      }
    });
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCurrentCar(car: Car) {
    car = this.currentCar;
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true
     }
    )
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      (this.cars = response.data), (this.dataLoaded = true);
    });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      (this.cars = response.data), (this.dataLoaded = true);
    });
  }

  getCarsByBrandAndColorId(brandId: number, colorId: number) {
    this.carService.getCarsByBrandAndColor(brandId, colorId)
      .subscribe(response => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  getCarImage(car:Car){
    if (car.imagePath == null) {

      let path = this.imageUrl + "DefaultImage.jpg"
      return path;
    }
    else{
      let path = this.imageUrl + car.imagePath;
      return path;
    }
  }
}
