import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/carModel/car';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  carDeleteForm: FormGroup;
  deletedCar: Car = {carId: 0,brandName: '', colorName: '', carName: '', modelYear: 0, colorId: 0, dailyPrice: 0, brandId: 0, imagePath: '',  };
  id: number;
  brand: string;
  color: string;
  model: string;
  modelYear: number;

  constructor(
    private toastrService: ToastrService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id = params['id'];
      this.getCarById(params['id']);
      this.createDeleteForm();
    })
  }

  getCarById(id: number) {
    this.carService.getCarById(id).subscribe((response) => {
      this.deletedCar = response.data;
      this.id = this.deletedCar.carId;
      this.brand = this.deletedCar.brandName;
      this.color = this.deletedCar.colorName;
      this.model = this.deletedCar.carName;
      this.modelYear = this.deletedCar.modelYear;
    });
  }

  createDeleteForm() {
    this.carDeleteForm = this.formBuilder.group({
      brand: ['', Validators.required],
      color: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
    });
  }

  delete(car: Car) {
    this.carService.delete(car).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i],"Hata")
          }
        }
      }
    );
  }

  backToCarList() {
    this.router.navigate(['/carlist']);
  }
}
