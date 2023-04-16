import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService:CarService
  ) {}

  ngOnInit(): void {}

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      carName:['', Validators.required],
      brandName:['', Validators.required],
      colorName:['', Validators.required],
      modelYear:['', Validators.required],
      dailyPrice:['', Validators.required]
    })
  }

  add() {
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      },responseError =>{
        this.toastrService.error(responseError.message,"Hata");
      })
    }else{
      this.toastrService.error('Formunuz eksik','Hata')
    }
  }
}
