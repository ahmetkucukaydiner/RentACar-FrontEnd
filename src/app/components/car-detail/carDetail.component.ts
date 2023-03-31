import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetailModel/carDetail';
import { CarImage } from 'src/app/models/carImageModel/carImage';
import { Car } from 'src/app/models/carModel/car';
import { CarDetailService } from 'src/app/services/carDetailService/carDetail.service';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './carDetail.component.html',
  styleUrls: ['./carDetail.component.css'],
})
export class CarDetailComponent implements OnInit {
  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute) { }


    dataLoaded = false;
    carDetails:Car = {} as Car
    carImages: CarImage[] = [];
    currentCar:Car

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        console.log(params)
        this.getCarById(params["carId"]);

        this.getCarImagesByCarId(params["carId"]);
      })
    }

    getCarById(id: number) {
      this.carService.getCarById(id).subscribe(response => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      })
    }

    getCarImagesByCarId(carId: number) {
      this.carImageService.getCarImagesByCarId(carId).subscribe(response => {
        console.log(response)
        this.carImages = response.data;
        this.dataLoaded = true;
      })
    }

    getImagePath(carImage: CarImage): string {
        let url: string = "https://localhost:44393/Uploads/Images/"+carImage.imagePath;
        return url
    }

    sertCurrentCar(car:Car){
      this.currentCar=car;
    }
}
