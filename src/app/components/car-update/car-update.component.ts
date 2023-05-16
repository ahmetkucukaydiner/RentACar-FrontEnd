import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/carModel/car';
import { CarService } from 'src/app/services/carService/car.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  car: Car = {carId:0, brandName:'', colorName:'', carName:'', modelYear:0, colorId:0, dailyPrice:0, brandId:0, imagePath:''}
  id: number;
  brand: string;
  color: string;
  model: string;
  modelYear: number;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
      this.getCarById(params['id']);
      this.createUpdateForm();
    });
  }

  getCarById(id: number) {
    this.carService.getCarById(id).subscribe(response => {
      this.car = response.data;
      this.brand = this.car.brandName;
      this.color = this.car.colorName;
      this.model = this.car.carName;
      this.modelYear = this.car.modelYear;
      this.id = this.car.carId;
    });
  }

  createUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brand: ['', Validators.required],
      color: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
    });
  }

  update() {
    let carModel = Object.assign({carId:this.car.carId}, this.carUpdateForm.value);
    if(this.carUpdateForm.valid){
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i = 0; responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i],"Hata")
          }
        }
      })
    }
  }

  backToCarList(){
    this.router.navigate(['/carlist'])
  }
}
