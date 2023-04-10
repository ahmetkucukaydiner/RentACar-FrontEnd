import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rentalModel/rental';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  dataLoaded = false;
  rentals: Rental[] = [];
  rentalForm: FormGroup;

  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRentals();
    this.createRentalFrom();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  createRentalFrom() {
    this.rentalForm = this.formBuilder.group({
      carId: ['', Validators.required],
      rentDate: ['', Validators.required],
      customerId: ['', Validators.required],
    });
  }

  add() {
    if (this.rentalForm.valid) {
      let rental: Rental = Object.assign({}, this.rentalForm.value);

      this.rentalService.add(rental).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı!');
        },
        (responseError) => {
          if (responseError) {
            this.toastrService.error(
              responseError.error.message,
              'Doğrulama hatası'
            );
          }
        }
      );
    }else{
      this.toastrService.error("Lütfen tüm alanları doldurunuz.","Hata!")
    }
  }
}
