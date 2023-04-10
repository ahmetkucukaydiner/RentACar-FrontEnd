import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/carDetail.component';
import { RentalComponent } from './components/rental/rental.component';
import { PayComponent } from './components/pay/pay.component';

const routes: Routes = [
  { path: "", pathMatch:"full", component: CarComponent},
  { path: "cars", component:CarComponent},
  { path: "cars/brand/:brandId", component:CarComponent},
  { path: "cars/color/:colorId", component:CarComponent},
  { path: 'cars/car/:carId', component:CarDetailComponent },
  { path: 'rentals/add', component:RentalComponent },
  { path: 'payments/pay', component:PayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
