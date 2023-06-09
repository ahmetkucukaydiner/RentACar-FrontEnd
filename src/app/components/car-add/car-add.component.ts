import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brandModel/brand';
import { Color } from 'src/app/models/colorModel/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  brands:Brand[] = []
  colors:Color[] = []

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private colorService:ColorService,
    private brandService:BrandService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
        carName: ['', Validators.required],
        brandId: ['', Validators.required],
        colorId: ['', Validators.required],
        modelYear: ['', Validators.required],
        dailyPrice: ['', Validators.required],
      }
    );
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      }
    )
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      }
    )
  }

  add() {
    console.log('deneme')
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.brandId = Number(carModel.brandId);
      carModel.colorId = Number(carModel.colorId);
      this.carService.add(carModel).subscribe(response => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        responseError => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Hata');
    }
  }
}
