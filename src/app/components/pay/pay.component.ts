import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/paymentModel/payment';
import { PaymentService } from 'src/app/services/paymentService/payment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
})
export class PayComponent implements OnInit {

  payAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createPayForm();
  }

  createPayForm() {
    this.payAddForm = this.formBuilder.group({
      fullName:['', Validators.required],
      cardNumber:['',Validators.required],
      cvv:['',Validators.required],
      month:['',Validators.required],
      year:['',Validators.required]
    });
  }

  add(){
    if(this.payAddForm.valid){
      let pay:Payment = Object.assign({},this.payAddForm.value);

      this.paymentService.add(pay).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı!")
      },responseError=>{
        if(responseError){
          this.toastrService.error(responseError.message,"Doğrulama hatası");
        }
      });
    }
    else{
      this.toastrService.error("Lütfen tüm alanları doldurunuz.","Hata!")
    }
  }
}
