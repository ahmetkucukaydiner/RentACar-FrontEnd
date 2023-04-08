import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetailModel/carDetail';
import { CarImage } from 'src/app/models/carImageModel/carImage';
import { Car } from 'src/app/models/carModel/car';
import { Rental } from 'src/app/models/rentalModel/rental';
import { CarDetailService } from 'src/app/services/carDetailService/carDetail.service';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';
import { CarService } from 'src/app/services/carService/car.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './carDetail.component.html',
  styleUrls: ['./carDetail.component.css'],
})
export class CarDetailComponent implements OnInit {
  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private cartService:CartService) { }


    dataLoaded = false;
    carDetails:Car = {} as Car
    carsDetail:Car[] = [];
    carImages: CarImage[] = [];
    currentCar:Car
    currentRental:Rental

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
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
        this.carImages = response.data;
        this.dataLoaded = true;
      })
    }

    getImagePath(carImage: CarImage): string {
        let url: string = "https://localhost:44393/Uploads/Images/"+carImage.imagePath;
        return url
    }

    setCurrentRental(rental:Rental){
      this.currentRental = rental
    }

    setCurrentCar(car:Car){
      this.currentCar=car;
    }

    addToCart(car:Car){
      this.cartService.addToCart(car);
      this.toastrService.success("Sepete eklendi",car.carName)
    }
}
