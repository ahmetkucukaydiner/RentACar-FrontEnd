import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rentalModel/rental';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  dataLoaded = false
  rentals: Rental[] = []

  constructor(private rentalService:RentalService,private toastrService:ToastrService){}

  ngOnInit(): void {
    this.getRentals()
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals = response.data
      this.dataLoaded = true
    })
  }
}
