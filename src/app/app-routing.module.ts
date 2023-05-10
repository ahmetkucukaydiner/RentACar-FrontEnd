import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/carDetail.component';
import { RentalComponent } from './components/rental/rental.component';
import { PayComponent } from './components/pay/pay.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';

const routes: Routes = [
  { path: "", pathMatch:"full", component: CarComponent},
  { path: "cars", component:CarComponent},
  { path: "cars/brand/:brandId", component:CarComponent},
  { path: "cars/color/:colorId", component:CarComponent},
  { path: 'cars/car/:carId', component:CarDetailComponent },
  { path: 'rentals/add', component:RentalComponent },
  { path: 'payments/pay', component:PayComponent },
  { path: 'cars/add', component:CarAddComponent},
  { path: 'brands/add', component:BrandAddComponent},
  { path: 'colors/add', component:ColorAddComponent},
  { path: 'update/:id', component:BrandUpdateComponent},
  { path: 'brands', component:BrandListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
