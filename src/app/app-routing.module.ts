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
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component'
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';

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
  { path: 'brands/update/:id', component:BrandUpdateComponent},
  { path: 'brands/delete/:id', component:BrandDeleteComponent},
  { path: 'brands', component:BrandListComponent},
  { path: 'colors', component:ColorListComponent},
  { path: 'colors/update/:id', component:ColorUpdateComponent},
  { path: 'colors/delete/:id', component:ColorDeleteComponent},
  { path: 'carlist' , component:CarListComponent},
  { path: 'cars/delete/:id', component:CarDeleteComponent},
  { path: 'cars/update/:id', component:CarUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
