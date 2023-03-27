import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage/carImage';
import { Car } from 'src/app/models/carModel/car';
import { Rental } from 'src/app/models/rentalModel/rental';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';
import { CarService } from 'src/app/services/carService/car.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute) { }


    dataLoaded = false;
    car: Car;
    carImages: CarImage[];

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.getCarByCarId(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      })
    }

    getCarByCarId(carId: number) {
      this.carService.getCarById(carId).subscribe(response => {
        this.car = response.data[0];
        this.dataLoaded = true;
      })
    }

    getCarImagesByCarId(carId: number) {
      this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
        this.carImages = response.data;
        this.dataLoaded = true;
      })
    }

    getImagePath(carImage: CarImage): string {
        let url: string = "https://localhost:4200/Uploads/Images/"+carImage.imagePath;
        return url
    }
}
